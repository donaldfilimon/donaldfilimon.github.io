import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { profile } from '@/content/site';

// content/identity.generated.json is a committed copy of the identity fields
// that are byte-identical with the enclosing GitHub Pages site (this tree is
// its sites/ subdirectory; the parent's copy is ../content/identity.generated.json,
// generated there by `bun scripts/export-identity.ts`). Neither site imports the
// other at build time; this test only detects drift.
type SharedIdentity = Record<string, string>;

// Vitest runs from the repository root (same convention as site.test.ts);
// jsdom makes import.meta.url a non-file URL, so resolve from process.cwd().
const localPath = resolve(process.cwd(), 'content/identity.generated.json');
const parentPath = resolve(process.cwd(), '../content/identity.generated.json');
const parentPresent = existsSync(parentPath);

function readIdentity(path: string): SharedIdentity {
  return JSON.parse(readFileSync(path, 'utf8')) as SharedIdentity;
}

describe('shared identity snapshot', () => {
  it('matches the profile fields in content/site.ts', () => {
    const identity = readIdentity(localPath);
    expect(Object.keys(identity).length).toBeGreaterThan(0);
    for (const [key, value] of Object.entries(identity)) {
      expect(profile[key as keyof typeof profile], key).toBe(value);
    }
  });
});

if (!parentPresent) {
  console.warn(
    `SKIPPED parent identity drift check: ${parentPath} not found. ` +
      'The committed snapshot was not compared with the parent site.',
  );
}

describe.skipIf(!parentPresent)('shared identity parent drift', () => {
  it('equals the snapshot committed in the parent site', () => {
    expect(readFileSync(localPath, 'utf8')).toBe(
      readFileSync(parentPath, 'utf8'),
    );
  });
});
