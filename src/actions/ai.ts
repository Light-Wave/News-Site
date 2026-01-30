"use server";

import prisma from "@/lib/prisma";
import { google } from "@ai-sdk/google";
import { generateImage, generateText, Output } from "ai";
import z from "zod";
import { createArticle } from "./article";

const AiArticleSchema = z.object({
  headline: z
    .string()
    .min(2, "Headline must be at least 2 characters")
    .max(100, "Headline can be at most 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content can be at most 10000 characters"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(100, "Summary can be at most 100 characters"),
  image: z.string().min(1, "Image url must be at least 1 character"),
});

const PersistedArticleSchema = AiArticleSchema.extend({
  categoryId: z.string().min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

export async function generateOsrsEconomyArticle(prompt: string) {
  if (typeof prompt !== "string") {
    return {
      success: false,
      error: "Prompt must be a valid string",
    };
  }

  const { output } = await generateText({
    // Remove system prompt and add to db (AiInstructions) and fetch it from there instead
    system:
      "You are a news reported writing about the Old School Runescape economy. Write each article as it would be designed for a real person in real life, (image it's not a video game)",
    model: google("gemini-2.5-flash"),
    prompt,
    output: Output.object({
      schema: z.object({
        headline: z.string().describe("Headline of the article"),
        content: z.string().describe("Content of the article"),
        summary: z.string().describe("Summarize the content of the article"),
      }),
    }),
  });

  const validOutput = validateOutput(output);

  // TODO: Implement feature to generate image, add test data, move prisma queries to their own file

  // const image = await generateOsrsEconomyImage(output.summary);
  // const validImage = validateOutput(image);

  if (!validOutput.success) {
    return {
      success: false,
      error: validOutput.error.message,
    };
  }


  // if (!validImage.success) {
  //   return {
  //     success: false,
  //     error: validImage.error.message,
  //   };
  // }

  // const categoryId = await prisma.category.findUnique({
  //   where: {
  //     name: "Economy",
  //   },
  // });

  // const writerId = await prisma.user.findUnique({
  //   where: {
  //     email: "EconomyWriter@hotmail.com",
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  await createArticle(
    PersistedArticleSchema.parse({
      ...validOutput.data,
      // image: validImage,
      // categoryId,
      // userId: writerId,
    }),
  );

  console.log(`Headline: ${output.headline} \n`);
  console.log(`Summary: ${output.summary}\n`);
  console.log(`Content: ${output.content}\n`);
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
