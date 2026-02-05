"use server";

import { google } from "@ai-sdk/google";
import { generateImage, generateText, Output } from "ai";
import z from "zod";
import { createArticle } from "./article";
import { getCategoryIdsByNames } from "./category";
import { getAiInstructionsByUserId, getUserIdByEmail } from "./user";

const AiArticleSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(2, "Headline must be at least 2 characters")
    .max(200, "Headline can be at most 200 characters")
    .transform((s) => s.slice(0, 100))
    .describe("Headline to the article. Can be at most 100 characters"),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content can be at most 10000 characters")
    .describe("Content to the article. Can be at most 10000 characters"),
  summary: z
    .string()
    .trim()
    .min(10, "Summary must be at least 10 characters")
    .max(800, "Summary can be at most 800 characters")
    .transform((s) => s.slice(0, 400))
    .describe("Summary to the article. Can be at most 400 characters"),
});

const AiImageSchema = AiArticleSchema.extend({
  image: z.string().min(1, "Image url must be at least 1 character"),
});

const PersistedArticleSchema = AiImageSchema.extend({
  categoryIds: z.array(z.string()).min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

const DEFAULT_INSTRUCTIONS =
  "You are an AI assistant that lives in a fantasy world writing news articles for 'The Bibliomancer's Brief'";
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
  const emailValidation = z.email().safeParse(aiWriterEmail);
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
  const aiInstructions = await getAiInstructionsByUserId(writerId.id);
  const systemInstructions = aiInstructions?.aiInstructions?.trim()
    ? aiInstructions.aiInstructions
    : DEFAULT_INSTRUCTIONS;

  const { output } = await generateText({
    system: systemInstructions,
    model: google("gemini-2.5-flash"), // Remember to add your GOOGLE_GENERATIVE_AI_API_KEY in .env
    prompt,
    output: Output.object({
      schema: AiArticleSchema,
    }),
  });

  const validOutput = validateOutput(output);

  if (!validOutput.success) {
    return {
      success: false,
      message: validOutput.error.message,
    };
  }
  // TODO: Implement feature to generate image, add test data, move prisma queries to their own file
  // const image = await generateOsrsEconomyImage(output.summary);
  // const validImage = validateOutput(image);

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
