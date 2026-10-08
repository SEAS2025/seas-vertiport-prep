import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import { KV_PREFIX, WORKSTREAMS, type WorkstreamId } from "../lib/workstreams.js";

const workstreamIds = Object.keys(WORKSTREAMS) as [WorkstreamId, ...WorkstreamId[]];

export default defineTool({
  description:
    "Update a SEAS utilization workstream status and next actions (persisted in host KV).",
  effect: "write",
  inputSchema: z.object({
    workstream: z.enum(workstreamIds),
    status: z.enum(["not_started", "in_progress", "blocked", "ready"]),
    notes: z.string().max(4000).optional(),
    nextActions: z.array(z.string().max(500)).max(12).optional(),
  }),
  async execute({ workstream, status, notes, nextActions }, ctx) {
    const meta = WORKSTREAMS[workstream];
    const record = {
      status,
      notes: notes ?? "",
      nextActions: nextActions?.length ? nextActions : meta.defaultNextActions,
      updatedAt: new Date().toISOString(),
    };
    await ctx.host.kv.put(`${KV_PREFIX}${workstream}`, record);
    return { workstream, ...record, title: meta.title };
  },
});
