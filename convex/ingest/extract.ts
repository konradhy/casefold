"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
const axios = require("axios");
const pdf = require("pdf-parse");

export const pdfText = internalAction({
  args: {
    fileUrl: v.string(),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Extracting text from PDF file: ", args.fileUrl, args.id);

    async function fetchAndParsePDF(url: string) {
      try {
        const response = await axios({
          url: url,
          method: "GET",
          responseType: "arraybuffer",
        });
        const dataBuffer = Buffer.from(response.data);

        const data = await pdf(dataBuffer);

        console.log(data.text);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await fetchAndParsePDF(args.fileUrl);
      console.log("PDF fetched and parsed successfully");
    } catch (err) {
      console.error("Error fetching and parsing PDF:", err);
    }
  },
});



