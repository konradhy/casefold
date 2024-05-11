import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    userId: v.string(),
    storageId: v.string(),
    fileType: v.string(),
    fileName: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    isArchived: v.boolean(),
    simplifiedPageTexts: v.optional(v.array(v.string())),
    noteBlocks: v.optional(v.array(v.string())),
  }),
});
