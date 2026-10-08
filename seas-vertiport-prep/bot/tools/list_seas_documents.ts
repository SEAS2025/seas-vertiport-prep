import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import { listSeasBusinessFiles } from "../lib/seas-docs.js";

export default defineTool({
  description:
    "List SEAS vertiport business documents seeded in the session workspace (seas-business/).",
  effect: "read",
  inputSchema: z.object({
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive substring filter on file paths."),
  }),
  async execute({ query }, ctx) {
    const files = await listSeasBusinessFiles(ctx.workspaceDir);
    const filtered = query
      ? files.filter((f) => f.relativePath.toLowerCase().includes(query.toLowerCase()))
      : files;
    return {
      count: filtered.length,
      files: filtered,
      hint: "Read files with your workspace file tools; anchor docs are listed in get_readiness_snapshot.",
    };
  },
});
