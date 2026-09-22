import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";

import generatedCatalog from "../content/project-catalog.generated.json";
import { projectCatalog } from "../content/project-catalog";
import {
  projectPublicationDecisions,
  projectPublicationExclusions,
} from "../content/project-publication";
import type { GeneratedProjectRecord } from "../content/project-types";
import { filterProjectCatalog } from "../components/site/project-atlas";
import {
  generateProjectCatalog,
  serializeProjectCatalog,
} from "../scripts/sync-project-catalog";

const generated = generatedCatalog as GeneratedProjectRecord[];
const registryPath =
  "content/registry/projects.toml";

test("publication manifest and generated catalog cover all 68 published projects", () => {
  expect(projectPublicationDecisions).toHaveLength(68);
  expect(generated).toHaveLength(68);
  expect(projectCatalog).toHaveLength(68);

  const decisionIds = projectPublicationDecisions.map((item) => item.stableId);
  const generatedIds = generated.map((item) => item.stableId);
  expect(new Set(decisionIds).size).toBe(68);
  expect(new Set(generatedIds).size).toBe(68);
  expect([...generatedIds].sort()).toEqual([...decisionIds].sort());
});

test("generated catalog is deterministic and current with the read-only registry", () => {
  const registry = readFileSync(registryPath, "utf8");
  const first = serializeProjectCatalog(generateProjectCatalog(registry));
  const second = serializeProjectCatalog(generateProjectCatalog(registry));
  expect(first).toBe(second);
  expect(first).toBe(readFileSync("content/project-catalog.generated.json", "utf8"));
});

test("an unapproved registry project blocks synchronization", () => {
  const registry = readFileSync(registryPath, "utf8");
  const extra = `${registry}\n[[projects]]\nstable_id = "unapproved-project"\ndisplay_name = "Unapproved"\nproject_kind = "primary"\nlifecycle = "active"\nownership = "personal"\nexport_policy = "private_only"\n`;
  expect(() => generateProjectCatalog(extra)).toThrow(
    "registry contains projects without publication decisions: unapproved-project",
  );
});

test("excluded registry projects are decided but never published", () => {
  expect(projectPublicationExclusions.length).toBeGreaterThan(0);
  const generatedIds = new Set(generated.map((item) => item.stableId));
  for (const stableId of projectPublicationExclusions) {
    expect(generatedIds.has(stableId)).toBe(false);
  }
});

test("an exclusion that is also published blocks synchronization", () => {
  const registry = readFileSync(registryPath, "utf8");
  expect(() =>
    generateProjectCatalog(registry, [...projectPublicationExclusions, "abi"]),
  ).toThrow("project is both published and excluded: abi");
});

test("an exclusion missing from the registry blocks synchronization", () => {
  const registry = readFileSync(registryPath, "utf8");
  expect(() =>
    generateProjectCatalog(registry, [...projectPublicationExclusions, "no-such-project"]),
  ).toThrow("publication exclusion missing from registry: no-such-project");
});

test("generated records expose only the public high-level schema", () => {
  const allowed = [
    "stableId",
    "displayName",
    "lifecycle",
    "ownership",
    "projectKind",
    "ecosystems",
    "publicationClass",
    "primaryStableId",
  ];
  for (const project of generated) {
    for (const key of Object.keys(project)) expect(allowed).toContain(key);
  }

  const serialized = JSON.stringify(generated);
  for (const forbidden of [
    "/Users/",
    "$HOME",
    "file://",
    "canonicalPath",
    "canonical_path",
    "gate_commands",
    "worktree",
    "dirty",
    "branch",
    "finding",
  ]) {
    expect(serialized.toLowerCase()).not.toContain(forbidden.toLowerCase());
  }
  expect(serialized).not.toMatch(/\bgh[pousr]_[A-Za-z0-9_]{20,}\b/);
});

test("featured, reference, recovery, and link boundaries are enforced", () => {
  expect(projectCatalog.filter((project) => project.featured)).toHaveLength(8);
  expect(
    projectCatalog
      .filter((project) => project.ownership === "external")
      .every((project) => project.publicationClass === "reference"),
  ).toBe(true);
  expect(
    projectCatalog
      .filter((project) => project.publicationClass === "reference")
      .every((project) => project.ownership === "external"),
  ).toBe(true);
  expect(
    projectCatalog
      .filter((project) => project.publicationClass === "recovery")
      .some((project) => Boolean(project.primaryStableId)),
  ).toBe(true);

  const decisionById = new Map(
    projectPublicationDecisions.map((item) => [item.stableId, item]),
  );
  for (const project of projectCatalog) {
    expect(project.links.map((link) => link.href)).toEqual(
      decisionById.get(project.stableId)?.approvedLinks ?? [],
    );
  }
});

test("atlas search and filters compose and reset to the full catalog", () => {
  const base = {
    query: "",
    lifecycle: "all" as const,
    ownership: "all" as const,
    publicationClass: "all" as const,
    ecosystem: "all",
  };
  expect(filterProjectCatalog(projectCatalog, base)).toHaveLength(68);
  expect(
    filterProjectCatalog(projectCatalog, { ...base, query: "ABBEY" }).map(
      (project) => project.stableId,
    ),
  ).toContain("abbey");
  expect(
    filterProjectCatalog(projectCatalog, { ...base, ecosystem: "rust" }).every(
      (project) => project.ecosystems.includes("rust"),
    ),
  ).toBe(true);
  expect(
    filterProjectCatalog(projectCatalog, {
      ...base,
      lifecycle: "active",
      ownership: "company",
    }).every(
      (project) => project.lifecycle === "active" && project.ownership === "company",
    ),
  ).toBe(true);
  expect(
    filterProjectCatalog(projectCatalog, {
      ...base,
      publicationClass: "recovery",
    }).every((project) => project.publicationClass === "recovery"),
  ).toBe(true);
});
