import {
  internalAction,
  internalMutation,
  internalQuery,
} from "../_generated/server";

import { internal } from "../_generated/api";

import { Doc, Id } from "../_generated/dataModel";

import { ConvexError, v } from "convex/values";

import OpenAI from "openai";
const openai = new OpenAI();

export const simplifyPageTexts = internalAction({
  args: {
    pageTexts: v.array(v.string()),
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    try {
      let messages = [
        {
          role: "system",
          content: "Look at these pages from a case. Summarize each paragraph.",
        },
      ];

      let simplifiedPageTexts = [];

      // Loop through each page of text
      for (let i = 0; i < args.pageTexts.length; i++) {
        // Add user's message for the current page
        messages.push({
          role: "user",
          content:
            "here is page " + (i + 1) + " of the case: " + args.pageTexts[i],
        });

        // Call the API
        let completion = await openai.chat.completions.create({
          //@ts-expect-error - idk why openai does this when you pass messages as an array
          messages: messages,
          model: "gpt-3.5-turbo",
          max_tokens: 200,
          temperature: 0.1,
        });

        let pageSimplifiedText = completion.choices[0].message.content;
        const currentTokensUsed = completion.usage?.total_tokens;

        if (!currentTokensUsed) {
          throw new Error("Could not get current tokens used");
        }

        if (currentTokensUsed > 6000) {
          const summaryCompletion = await openai.chat.completions.create({
            //@ts-expect-error - idk why openai does this when you pass messages as an array
            messages: messages, // Send all previous messages for summary
            model: "gpt-3.5-turbo",
            max_tokens: 1000, // Allocate more tokens for a detailed summary
            temperature: 0.1,
          });

          const summary = summaryCompletion.choices[0].message.content;

          messages = [
            {
              role: "system",
              content: "Summary so far: " + summary,
            },
            {
              role: "user",
              content: "Continuing discussion: " + args.pageTexts[i],
            },
          ];

          completion = await openai.chat.completions.create({
            //@ts-expect-error - idk why openai does this when you pass messages as an array
            messages: messages,
            model: "gpt-3.5-turbo",
            max_tokens: 400,
            temperature: 0.1,
          });

          pageSimplifiedText = completion.choices[0].message.content;
        }

        if (pageSimplifiedText === null) {
          throw new Error("Could not simplify page text");
        }

        // Store the simplified text for this page
        simplifiedPageTexts.push(pageSimplifiedText);

        // Add the assistant's response to maintain context
        messages.push({
          role: "assistant",
          content: pageSimplifiedText,
        });
        console.log(
          "Simplified text for page " + (i + 1) + ": " + pageSimplifiedText,
        );
      }

      // Store all simplified texts at once (or you can modify to store per page inside the loop)
      await ctx.runMutation(internal.files.insertSimplifiedPageTexts, {
        id: args.id,
        simplifiedPageTexts: simplifiedPageTexts,
      });
    } catch (err) {
      console.error("Error initializing OpenAI: ", err);
    }
  },
});
