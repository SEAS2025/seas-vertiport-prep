import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export const SEAS_BUSINESS_DIR = "seas-business";

export async function listSeasBusinessFiles(
  workspaceRoot: string,
): Promise<{ relativePath: string; bytes: number }[]> {
  const root = path.join(workspaceRoot, SEAS_BUSINESS_DIR);
  const out: { relativePath: string; bytes: number }[] = [];

  async function walk(dir: string, prefix: string) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, rel);
        continue;
      }
      const info = await stat(full);
      out.push({ relativePath: `${SEAS_BUSINESS_DIR}/${rel}`, bytes: info.size });
    }
  }

  await walk(root, "");
  out.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  return out;
}

export async function fileExistsInWorkspace(
  workspaceRoot: string,
  relativePath: string,
): Promise<boolean> {
  try {
    const info = await stat(path.join(workspaceRoot, relativePath));
    return info.isFile();
  } catch {
    return false;
  }
}
