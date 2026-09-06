import { afterEach, expect, setSystemTime, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, utimesSync, writeFileSync, renameSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import sitemap from "../app/sitemap";
import nextConfig from "../next.config";
import { generateSourceBuildId } from "../scripts/build-id";

const fixtures: string[] = [];

function write(root: string, path: string, content: string) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
}

function fixture(reverse = false) {
  const root = mkdtempSync(join(tmpdir(), "site-build-id-"));
  fixtures.push(root);
  const files = [
    "app/page.tsx", "components/site/header.tsx", "content/site.ts",
    "lib/utils.ts", "public/favicon.svg", "scripts/build-id.ts",
    "next.config.ts", "postcss.config.mjs", "tsconfig.json", "package.json", "bun.lock",
  ];
  for (const path of reverse ? files.reverse() : files) write(root, path, path);
  return root;
}

afterEach(() => {
  setSystemTime();
  for (const root of fixtures.splice(0)) rmSync(root, { recursive: true, force: true });
});

test("build ID is independent of checkout path, file order, mtimes, Git and generated output", () => {
  const root = fixture();
  const expected = generateSourceBuildId(root);
  expect(expected).toMatch(/^[a-f0-9]{64}$/);
  expect(generateSourceBuildId(fixture(true))).toBe(expected);
  utimesSync(join(root, "app/page.tsx"), new Date(0), new Date(0));
  for (const path of ["docs/index.html", "out/index.html", ".next/BUILD_ID", ".git/HEAD", "tsconfig.tsbuildinfo"]) {
    write(root, path, "changes on every check or commit");
  }
  expect(generateSourceBuildId(root)).toBe(expected);
});

test("build ID changes for source, assets, catalog, configuration and dependency changes", () => {
  for (const path of ["app/page.tsx", "components/site/header.tsx", "content/site.ts", "lib/utils.ts", "public/favicon.svg", "scripts/build-id.ts", "next.config.ts", "postcss.config.mjs", "tsconfig.json", "package.json", "bun.lock"]) {
    const root = fixture();
    const before = generateSourceBuildId(root);
    write(root, path, "changed");
    expect(generateSourceBuildId(root)).not.toBe(before);
  }
});

test("build ID includes added, removed and renamed input paths", () => {
  const root = fixture();
  const original = generateSourceBuildId(root);
  write(root, "content/project-catalog.generated.json", "[]");
  const added = generateSourceBuildId(root);
  expect(added).not.toBe(original);
  renameSync(join(root, "content/project-catalog.generated.json"), join(root, "content/renamed.json"));
  expect(generateSourceBuildId(root)).not.toBe(added);
  rmSync(join(root, "content/renamed.json"));
  expect(generateSourceBuildId(root)).toBe(original);
});

test("Next static export uses the source build ID", async () => {
  expect(nextConfig.output).toBe("export");
  expect(nextConfig.generateBuildId).toBeDefined();
  expect(await nextConfig.generateBuildId!()).toBe(generateSourceBuildId());
});

test("sitemap does not report the check time as a content modification", () => {
  setSystemTime(new Date("2026-01-01T00:00:00Z"));
  const first = sitemap();
  setSystemTime(new Date("2027-01-01T00:00:00Z"));
  expect(sitemap()).toEqual(first);
  expect(first[0].lastModified).toBeUndefined();
});
