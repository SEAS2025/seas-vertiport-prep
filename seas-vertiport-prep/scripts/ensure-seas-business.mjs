import { access, cp, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "bot", "sandbox", "workspace", "seas-business");
const marker = path.join(dest, "South East Aerial Systems.md");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

if (await exists(marker)) {
  process.exit(0);
}

const repo =
  process.env.SEAS_AMS_REPO ?? "https://github.com/SEAS2025/Airline-Management-System.git";
const cloneDir = path.join(tmpdir(), `seas-ams-${Date.now()}`);
const result = spawnSync("git", ["clone", "--depth", "1", repo, cloneDir], {
  stdio: "inherit",
});
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const src = path.join(cloneDir, "South East Aerial Systems Modular System");
await mkdir(path.dirname(dest), { recursive: true });
await cp(src, dest, { recursive: true });
process.exit(0);
