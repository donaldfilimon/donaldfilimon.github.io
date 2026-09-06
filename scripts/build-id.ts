import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Hash inputs, never docs/out/.next or Git HEAD: publishing and committing an
// unchanged export must not feed back into the next build's identity.
const sourceDirectories = ["app", "components", "content", "lib", "public", "scripts"];
const buildFiles = ["next.config.ts", "postcss.config.mjs", "tsconfig.json", "package.json", "bun.lock"];

export function generateSourceBuildId(root = process.cwd()): string {
  const files = [...buildFiles];
  function collect(directory: string) {
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) collect(path);
      else if (entry.isFile()) files.push(path);
    }
  }
  for (const directory of sourceDirectories) collect(directory);

  const hash = createHash("sha256");
  for (const path of files.sort()) {
    const digest = createHash("sha256").update(readFileSync(join(root, path))).digest("hex");
    hash.update(JSON.stringify([path, digest]) + "\n");
  }
  return hash.digest("hex");
}
