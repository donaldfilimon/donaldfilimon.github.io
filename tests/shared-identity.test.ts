import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { sharedIdentity } from "../content/shared-identity";
import { site } from "../content/site";
import { identitySnapshotPath, renderIdentitySnapshot } from "../scripts/export-identity";

test("committed identity snapshot matches content/shared-identity.ts", () => {
  // Fix a failure with `bun scripts/export-identity.ts`; the sibling Sites repo
  // compares its copy against this file.
  expect(readFileSync(identitySnapshotPath, "utf8")).toBe(renderIdentitySnapshot());
});

test("site carries every shared identity field unchanged", () => {
  for (const [key, value] of Object.entries(sharedIdentity)) {
    expect(site[key as keyof typeof sharedIdentity]).toBe(value);
  }
});
