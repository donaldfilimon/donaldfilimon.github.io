import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { sharedIdentity } from "../content/shared-identity";

export const identitySnapshotPath = join(import.meta.dir, "../content/identity.generated.json");

export function renderIdentitySnapshot(): string {
  return `${JSON.stringify(sharedIdentity, null, 2)}\n`;
}

if (import.meta.main) {
  const expected = renderIdentitySnapshot();
  if (process.argv.includes("--check")) {
    const actual = readFileSync(identitySnapshotPath, "utf8");
    if (actual !== expected) {
      console.error("content/identity.generated.json is stale; run `bun scripts/export-identity.ts`");
      process.exit(1);
    }
    console.log("identity snapshot ok");
  } else {
    writeFileSync(identitySnapshotPath, expected);
    console.log(`wrote ${identitySnapshotPath}`);
  }
}
