import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "readiness-baseline",
      description: "Agent loads readiness snapshot and names domain workstreams.",
      async test(t) {
        await t.send(
          "Run get_readiness_snapshot and list the domain workstreams (regulatory, engineering, finance).",
        );
        t.succeeded();
        t.calledTool("get_readiness_snapshot");
        t.check(t.reply, includes(/regulatory|engineering|finance/i));
      },
    },
    {
      id: "kickoff-delegation",
      description: "Kickoff returns parallel subagent delegation plan.",
      async test(t) {
        await t.send("Call kickoff_utilization and tell me which subagents to run in parallel.");
        t.succeeded();
        t.calledTool("kickoff_utilization");
        t.check(t.reply, includes(/regulatory|engineering|business|finance/i));
      },
    },
  ],
});
