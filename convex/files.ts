import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

    return fileUrl;
  },
});

