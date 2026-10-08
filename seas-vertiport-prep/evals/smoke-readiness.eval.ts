import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "readiness-baseline",
      description: "Agent loads readiness snapshot and names SEAS workstreams.",
      async test(t) {
        await t.send(
          "Run get_readiness_snapshot and summarize which workstreams are not_started. Mention vertiport.",
        );
        t.succeeded();
        t.calledTool("get_readiness_snapshot");
        t.check(t.reply, includes(/regulatory|sites|partnerships/i));
        t.check(t.reply, includes(/vertiport/i));
      },
    },
  ],
});
