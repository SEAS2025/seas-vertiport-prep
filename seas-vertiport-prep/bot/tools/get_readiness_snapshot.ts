import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import { fileExistsInWorkspace } from "../lib/seas-docs.js";
import { KV_PREFIX, WORKSTREAMS, type WorkstreamId, type WorkstreamRecord } from "../lib/workstreams.js";

export default defineTool({
  description:
    "Return utilization readiness by workstream: anchor document presence plus tracked status from host KV.",
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const workstreams = {} as Record<
      WorkstreamId,
      {
        title: string;
        status: WorkstreamRecord["status"];
        notes: string;
        nextActions: string[];
        anchorDocs: { path: string; present: boolean }[];
      }
    >;

    for (const [id, meta] of Object.entries(WORKSTREAMS) as [
      WorkstreamId,
      (typeof WORKSTREAMS)[WorkstreamId],
    ][]) {
      const stored = (await ctx.host.kv.get(`${KV_PREFIX}${id}`)) as WorkstreamRecord | null;
      const anchorDocs = await Promise.all(
        meta.anchorDocs.map(async (name) => ({
          path: `seas-business/${name}`,
          present: await fileExistsInWorkspace(ctx.workspaceDir, `seas-business/${name}`),
        })),
      );

      workstreams[id] = {
        title: meta.title,
        status: stored?.status ?? "not_started",
        notes: stored?.notes ?? "",
        nextActions: stored?.nextActions?.length
          ? stored.nextActions
          : meta.defaultNextActions,
        anchorDocs,
      };
    }

    const allAnchors = Object.values(workstreams).flatMap((w) => w.anchorDocs);
    const present = allAnchors.filter((a) => a.present).length;

    return {
      summary: {
        workstreams: Object.keys(workstreams).length,
        anchorDocsPresent: present,
        anchorDocsTotal: allAnchors.length,
      },
      workstreams,
      githubSource: "https://github.com/SEAS2025/Airline-Management-System",
    };
  },
});
