import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

//rename to saveFile
export const saveStorageId = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Identity not found");
    }

    const id = await ctx.db.insert("files", {
      storageId: args.storageId as Id<"_storage">,
      userId: identity.tokenIdentifier,
      fileType: args.fileType,
      fileName: args.fileName,
      updatedAt: "new",
      isArchived: false,
    });

    const fileUrl = await ctx.storage.getUrl(args.storageId);

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

    return file.simplifiedPageTexts[args.pageNumber];
  },
});

export const getBlock = query({
  args: {
    fileId: v.id("files"),
    pageNumber: v.number(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file || !file.noteBlocks) {
      return null;
    }

    return file.noteBlocks[args.pageNumber];
  },
});

export const savePageText = mutation({
  args: {
    fileId: v.id("files"),
    pageNumber: v.number(),
    pageText: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      return null;
    }

    console.log("grabs the file", file._id);
    let noteBlocks = file.noteBlocks || [];
    //because maybe we somehow skipped pages.
    console.log("checks noteBlocks", noteBlocks.length);
    console.log("checks pageNumber", args.pageNumber);
    if (args.pageNumber >= noteBlocks.length) {
      noteBlocks = [
        ...noteBlocks,
        ...new Array(args.pageNumber - noteBlocks.length).fill(""),
      ];
    }

    noteBlocks[args.pageNumber] = args.pageText;

    await ctx.db.patch(args.fileId, {
      noteBlocks,
    });
  },
});

export const getFilesForUser = query({
  args: {
    searchString: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.log(identity);
      throw new Error("Unauthenticated");
    }
    if (args.searchString) {
      const files = await ctx.db
        .query("files")
        .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
        .collect();

      console.log(" search string", args.searchString);

      const filteredFiles = files.filter((file) =>
        args.searchString
          ? file.fileName
              .toLowerCase()
              .includes(args.searchString.toLowerCase())
          : false,
      );

      return filteredFiles;
    }

    const files = await ctx.db
      .query("files")
      .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
      .collect();

    return files;
  },
});

export const getFile = query({
  args: {
    fileId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated not logged in ");
      console.log("Unauthenticated");
    }
    if (!args.fileId) {
      return null;
    }
    const isValidId = ctx.db.normalizeId("files", args.fileId);

    if (!isValidId) {
      console.log("Invalid id");
      return null;
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      return null;
    }
    //check if the file belongs to the user
    if (file.userId !== identity.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const fileUrl = await ctx.storage.getUrl(file.storageId);
    if (fileUrl === null) {
      throw new Error("File not found");
    }

    return fileUrl;
  },
});
