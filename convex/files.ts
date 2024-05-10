import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageId = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("files", {
      storageId: args.storageId,
      userId: "123",
      fileType: "pdf",
      fileName: "test",
      createdAt: "test",
      updatedAt: "test",
      isArchived: false,
    });

    const fileUrl = await ctx.storage.getUrl(args.storageId as Id<"_storage">);

    if (fileUrl === null) {
      throw new Error("File not found");
    }
    await ctx.scheduler.runAfter(0, internal.ingest.extract.pdfText, {
      fileUrl: fileUrl,
      id,
    });

    return { fileUrl, id };
  },
});

export const insertSimplifiedPageTexts = internalMutation({
  args: {
    id: v.id("files"),
    simplifiedPageTexts: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      simplifiedPageTexts: args.simplifiedPageTexts,
    });
  },
});

export const getPageText = query({
  args: {
    fileId: v.id("files"),
    pageNumber: v.number(),
  },
  handler: async (ctx, args) => {
    //do an auth check here

    const file = await ctx.db.get(args.fileId);
    if (!file || !file.simplifiedPageTexts) {
      return null;
    }
    console.log(file.simplifiedPageTexts[0]);
    return file.simplifiedPageTexts[0];
  },
});







