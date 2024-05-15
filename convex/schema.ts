import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    userId: v.string(),
    storageId: v.id("_storage"),
    fileType: v.string(),
    fileName: v.string(),

    updatedAt: v.string(),
    isArchived: v.boolean(),
    simplifiedPageTexts: v.optional(v.array(v.string())),
    noteBlocks: v.optional(v.array(v.string())),
    company: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});
