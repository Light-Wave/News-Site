"use server";

import { google } from "@ai-sdk/google";
import { generateImage, generateText, Output } from "ai";
import z from "zod";
import { createArticle } from "./article";
import { getAiInstructions, getUserIdByEmail } from "./user";
import { getCategoryIdByName, getCategoryIdsByNames } from "./category";

const AiArticleSchema = z.object({
  headline: z
    .string()
    .min(2, "Headline must be at least 2 characters")
    .max(100, "Headline can be at most 100 characters")
    .describe("Headline of the article."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content can be at most 10000 characters")
    .describe("Content of the article."),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary can be at most 500 characters")
    .describe("Summarize the content of the article."),
});

const AiImageSchema = AiArticleSchema.extend({
  image: z.string().min(1, "Image url must be at least 1 character"),
});

const PersistedArticleSchema = AiImageSchema.extend({
  categoryIds: z.array(z.string()).min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

/**
 *
 * @param prompt What kind of news article you want to generate
 * @param categoryNames Which categories you want to create it in
 * @param aiWriterEmail Email connected to the Ai Writer, will be used to fetch ID of writer
 * @returns Result object indicating success or failure of the AI-generated article creation
 */

export async function generateArticle(
  prompt: string,
  categoryNames: string[],
  aiWriterEmail: string,
) {
  if (!prompt || prompt.trim().length === 0) {
    return {
      success: false,
      message: "Prompt must not be empty.",
    };
  }
  if (!Array.isArray(categoryNames) || categoryNames.length === 0) {
    return {
      success: false,
      message: "At least one category name is required.",
    };
  }
  const emailValidation = z.string().email().safeParse(aiWriterEmail);
  if (!emailValidation.success) {
    return {
      success: false,
      message: "A valid aiWriterEmail must be provided.",
    };
  }

  const { found, notFound } = await getCategoryIdsByNames(categoryNames);
  const categoryIds = found.map((c) => c.id);
  const notFoundCategories = notFound;

  if (categoryIds.length === 0) {
    return {
      success: false,
      message:
        notFoundCategories.length > 0
          ? `No matching categories found for: ${notFoundCategories.join(", ")}`
          : "At least one valid category is required to generate an article",
    };
  }

  const writerId = await getUserIdByEmail(aiWriterEmail);
  if (!writerId) {
    return {
      success: false,
      message: "Couldn't fetch writer ID",
    };
  }
  const aiInstructions = await getAiInstructions(writerId.id);
  const systemInstructions =
    aiInstructions &&
    typeof aiInstructions.aiInstructions === "string" &&
    aiInstructions.aiInstructions.trim().length > 0
      ? aiInstructions.aiInstructions
      : "You are an AI assistant that lives in a fantasy world writing news articles for 'The Bibliomancer's Brief'";
  let output;
  try {
    output = await generateText({
      system: systemInstructions,
      model: google("gemini-2.5-flash"),
      prompt,
      output: Output.object({
        schema: AiArticleSchema,
      }),
    });
  } catch (error) {
    // Log the underlying error for debugging/observability
    console.error("Error generating text with AI API:", error);
    let errorMessage = "Error talking with API";
    if (error instanceof Error && error.message) {
      const msg = error.message.toLowerCase();
      if (msg.includes("rate limit")) {
        errorMessage = "AI API rate limit exceeded. Please try again later.";
      } else if (
        msg.includes("unauthorized") ||
        msg.includes("forbidden") ||
        msg.includes("authentication")
      ) {
        errorMessage =
          "Authentication error while communicating with the AI API.";
      } else if (msg.includes("network") || msg.includes("timeout")) {
        errorMessage =
          "Network error while communicating with the AI API. Please check your connection and try again.";
      }
    }
    return {
      success: false,
      message: errorMessage,
    };
  }

  const validOutput = validateOutput(output);

  // TODO: Implement feature to generate image, add test data, move prisma queries to their own file
  // const image = await generateOsrsEconomyImage(output.summary);
  // const validImage = validateOutput(image);

  if (!validOutput.success) {
    return {
      success: false,
      message: validOutput.error.message,
    };
  }

  // if (!validImage.success) {
  //   return {
  //     success: false,
  //     message: validImage.error.message,
  //   };
  // }

  try {
    const createResult = await createArticle(
      PersistedArticleSchema.parse({
        ...validOutput.data,
        image: "Implement real image once we can generate with AI",
        categoryIds: categoryIds,
        userId: writerId.id,
      }),
    );

    const { success, error: createError } = createResult as {
      success?: boolean;
      error?: unknown;
    };
    if (success === false) {
      return {
        success: false,
        error:
          typeof createError === "string"
            ? createError
            : "Failed to create article",
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the article",
    };
  }
}

async function generateOsrsEconomyImage(summary: string) {
  const { image } = await generateImage({
    model: google.image("image-4.0-generate-001"),
    prompt: summary,
    aspectRatio: "16:9",
  });
  return image.base64;
}

function validateOutput(output: unknown) {
  return AiArticleSchema.safeParse(output);
}

function validateImage(image: unknown) {
  return AiImageSchema.safeParse(image);
}
