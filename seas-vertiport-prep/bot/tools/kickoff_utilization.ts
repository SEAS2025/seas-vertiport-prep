import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import {
  DOMAIN_SUBAGENT_IDS,
  KV_PREFIX,
  WORKSTREAMS,
  type WorkstreamRecord,
} from "../lib/workstreams.js";

export default defineTool({
  description:
    "Start a full utilization sprint: mark all domain workstreams in_progress and return parallel subagent delegation prompts.",
  effect: "write",
  inputSchema: z.object({
    sprintGoal: z
      .string()
      .max(2000)
      .optional()
      .describe("Optional focus for this sprint, e.g. Phase 1 Lake Murray site."),
  }),
  async execute({ sprintGoal }, ctx) {
    const now = new Date().toISOString();
    for (const id of DOMAIN_SUBAGENT_IDS) {
      const meta = WORKSTREAMS[id];
      const prior = (await ctx.host.kv.get(`${KV_PREFIX}${id}`)) as WorkstreamRecord | null;
      const record: WorkstreamRecord = {
        status: "in_progress",
        notes: sprintGoal
          ? `Kickoff ${now}: ${sprintGoal}`
          : prior?.notes || `Kickoff ${now}`,
        nextActions: meta.defaultNextActions,
        updatedAt: now,
      };
      await ctx.host.kv.put(`${KV_PREFIX}${id}`, record);
    }

    return {
      sprintStartedAt: now,
      sprintGoal: sprintGoal ?? "Full utilization prep across all domains",
      delegateInParallel: DOMAIN_SUBAGENT_IDS.map((id) => ({
        subagent: id,
        workstream: id,
        title: WORKSTREAMS[id].title,
        taskPrompt: `Domain sprint for ${WORKSTREAMS[id].title}. ${sprintGoal ?? "Prepare SEAS vertiport network for operational utilization."} Read anchor docs, produce gap list and next 3 actions, update workstream ${id}.`,
      })),
      instruction:
        "Use the task tool to run each subagent above in parallel (one task per subagent), then synthesize a single executive summary for the user.",
    };
  },
});
