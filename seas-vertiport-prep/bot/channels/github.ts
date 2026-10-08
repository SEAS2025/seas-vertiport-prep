import { defaultGitHubAuth, githubChannel } from "@cursor/bdk/channels/github";

/**
 * Enable Cursor SCM events at serve/deploy time:
 *   npx @cursor/bdk serve --dir . --cursor-events --cursor-events-repo SEAS2025/Airline-Management-System
 * Set `cursorAccount: { repos: [...] }` when hosting on Cursor with GitHub linked.
 */
export default githubChannel({
  botName: "seas-vertiport-prep",

  onIssue: (ctx, issue) => {
    if (issue.action !== "opened" && issue.action !== "reopened") {
      return null;
    }
    const title = issue.title.toLowerCase();
    if (!title.includes("vertiport") && !title.includes("seas") && !title.includes("uam")) {
      return null;
    }
    return { auth: defaultGitHubAuth(ctx) };
  },

  onPullRequest: (ctx, pr) => {
    if (pr.action !== "opened" && pr.action !== "synchronize") {
      return null;
    }
    return { auth: defaultGitHubAuth(ctx) };
  },
});
