import {
  internalAction,
  internalMutation,
  internalQuery,
} from "../_generated/server";

import { internal } from "../_generated/api";

import { Doc, Id } from "../_generated/dataModel";

import { ConvexError, v } from "convex/values";

import OpenAI from "openai";

export const simplifyPageTexts = internalAction({
  args: {
    pageTexts: v.array(v.string()),
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    try {
      const openai = new OpenAI();
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Look at this page from a case. Summarize each paragraph.",
          },
          {
            role: "user",
            content: "here is page 1 of the case: " + args.pageTexts[0],
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        temperature: 0.1,
      });

      const simplifiedPageText = completion.choices[0].message.content;
      if (simplifiedPageText === null) {
        throw new ConvexError("Could not simplify page text");
      }

      await ctx.runMutation(internal.files.insertSimplifiedPageTexts, {
        id: args.id,
        simplifiedPageTexts: [simplifiedPageText],
      });
    } catch (err) {
      console.error("Error initializing OpenAI: ", err);
    }
  },
});
