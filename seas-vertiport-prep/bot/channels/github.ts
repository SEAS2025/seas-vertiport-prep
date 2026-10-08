import { defaultGitHubAuth, githubChannel } from "@cursor/bdk/channels/github";

export default githubChannel({
  botName: "seas-vertiport-prep",
  cursorAccount: {
    repos: [
      "SEAS2025/seas-vertiport-prep",
      "SEAS2025/Airline-Management-System",
    ],
    permissions: "pr-write",
  },

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
