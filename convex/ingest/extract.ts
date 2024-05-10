"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
const axios = require("axios");
const pdf = require("pdf-parse");

interface PageData {
  getTextContent: (
    options: any,
  ) => Promise<{ items: { str: string; transform: number[] }[] }>;
}

interface RenderOptions {
  normalizeWhitespace: boolean;
  disableCombineTextItems: boolean;
}

export const pdfText = internalAction({
  args: {
    fileUrl: v.string(),
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    console.log("Extracting text from PDF file: ", args.fileUrl, args.id);

    try {
      const pageTexts = await fetchAndParsePDF(args.fileUrl);

      if (pageTexts === undefined) {
        return;
      }

      await ctx.runAction(
        internal.ingest.textTransformServices.simplifyPageTexts,
        {
          pageTexts: pageTexts,
          id: args.id,
        },
      );
    } catch (err) {
      console.error("Error fetching and parsing PDF:", err);
    }
  },
});

//helper functions
async function renderPage(page: PageData): Promise<string> {
  const renderOptions: RenderOptions = {
    normalizeWhitespace: true,
    disableCombineTextItems: false,
  };

  const textContent = await page.getTextContent(renderOptions);
  let text: string = "";
  let lastY: number | undefined;

  textContent.items.forEach((item) => {
    if (lastY !== item.transform[5] && lastY !== undefined) {
      text += "\n";
    }
    text += item.str;
    lastY = item.transform[5];
  });

  return text;
}

async function fetchAndParsePDF(url: string): Promise<string[] | undefined> {
  try {
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer" as ResponseType,
    });

    const dataBuffer = Buffer.from(response.data);

    const pageTexts: string[] = [];

    const options = {
      pagerender: (pageData: PageData) =>
        renderPage(pageData).then((text) => {
          pageTexts.push(text);
          return text;
        }),
    };
    const data = await pdf(dataBuffer, options);
    return pageTexts;
  } catch (error) {
    console.error("Error fetching or parsing PDF:", error);
  }
}



