import { access, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vendor = path.join(root, "vendor", "ecc");
const marker = path.join(vendor, ".claude-plugin", "plugin.json");

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

await mkdir(path.join(root, "vendor"), { recursive: true });
const repo = process.env.SEAS_ECC_REPO ?? "https://github.com/SEAS2025/ECC-mirror.git";
const result = spawnSync("git", ["clone", "--depth", "1", repo, vendor], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
