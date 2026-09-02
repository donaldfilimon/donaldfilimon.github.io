import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { projectPublicationDecisions } from "../content/project-publication";
import type {
  GeneratedProjectRecord,
  ProjectLifecycle,
  ProjectOwnership,
  RegistryProjectKind,
} from "../content/project-types";

const DEFAULT_REGISTRY = "../project-registry/registry/projects.toml";
const DEFAULT_OUTPUT = "content/project-catalog.generated.json";
const ALLOWED_LIFECYCLES = new Set<ProjectLifecycle>([
  "active",
  "experimental",
  "archived",
  "retired",
  "external",
]);
const ALLOWED_OWNERSHIP = new Set<ProjectOwnership>([
  "personal",
  "company",
  "external",
]);
const ALLOWED_KINDS = new Set<RegistryProjectKind>([
  "primary",
  "exceptional",
  "reference",
]);

type RegistryProject = {
  stable_id?: unknown;
  display_name?: unknown;
  lifecycle?: unknown;
  ownership?: unknown;
  project_kind?: unknown;
  ecosystems?: unknown;
};

type RegistryDocument = {
  projects?: unknown;
};

function stringField(value: unknown, field: string, stableId?: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${stableId ?? "registry"}: invalid ${field}`);
  }
  return value.trim();
}

function parseArgs(args: string[]) {
  let registry = DEFAULT_REGISTRY;
  let output = DEFAULT_OUTPUT;
  let check = false;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--registry") {
      registry = args[index + 1] ?? "";
      index += 1;
    } else if (argument === "--output") {
      output = args[index + 1] ?? "";
      index += 1;
    } else if (argument === "--check") {
      check = true;
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }

  return { registry: resolve(registry), output: resolve(output), check };
}

function assertSafeDocument(records: GeneratedProjectRecord[]) {
  const serialized = JSON.stringify(records);
  const forbidden = [
    "/Users/",
    "$HOME",
    "file://",
    "canonical_path",
    "gate_commands",
    "worktree",
    "dirty",
    "branch",
    "finding",
    "private key",
  ];
  const tokenShape = /\bgh[pousr]_[A-Za-z0-9_]{20,}\b|(?:api[_-]?key|token|secret|password)=/i;

  for (const value of forbidden) {
    if (serialized.toLowerCase().includes(value.toLowerCase())) {
      throw new Error(`generated catalog contains forbidden value: ${value}`);
    }
  }
  if (tokenShape.test(serialized)) {
    throw new Error("generated catalog contains a credential-shaped value");
  }
}

export function generateProjectCatalog(registryText: string): GeneratedProjectRecord[] {
  const document = Bun.TOML.parse(registryText) as RegistryDocument;
  if (!Array.isArray(document.projects)) {
    throw new Error("registry is missing projects");
  }

  const sourceById = new Map<string, RegistryProject>();
  for (const value of document.projects) {
    if (!value || typeof value !== "object") {
      throw new Error("registry contains a non-object project");
    }
    const project = value as RegistryProject;
    const stableId = stringField(project.stable_id, "stable_id");
    if (sourceById.has(stableId)) {
      throw new Error(`duplicate registry stable ID: ${stableId}`);
    }
    sourceById.set(stableId, project);
  }

  const decisionIds = new Set<string>();
  const records = projectPublicationDecisions.map((decision) => {
    if (decisionIds.has(decision.stableId)) {
      throw new Error(`duplicate publication stable ID: ${decision.stableId}`);
    }
    decisionIds.add(decision.stableId);

    const source = sourceById.get(decision.stableId);
    if (!source) {
      throw new Error(`publication project missing from registry: ${decision.stableId}`);
    }

    const lifecycle = stringField(
      source.lifecycle,
      "lifecycle",
      decision.stableId,
    ) as ProjectLifecycle;
    const ownership = stringField(
      source.ownership,
      "ownership",
      decision.stableId,
    ) as ProjectOwnership;
    const projectKind = stringField(
      source.project_kind,
      "project_kind",
      decision.stableId,
    ) as RegistryProjectKind;

    if (!ALLOWED_LIFECYCLES.has(lifecycle)) {
      throw new Error(`${decision.stableId}: unsupported lifecycle ${lifecycle}`);
    }
    if (!ALLOWED_OWNERSHIP.has(ownership)) {
      throw new Error(`${decision.stableId}: unsupported ownership ${ownership}`);
    }
    if (!ALLOWED_KINDS.has(projectKind)) {
      throw new Error(`${decision.stableId}: unsupported project kind ${projectKind}`);
    }
    const ecosystems = source.ecosystems ?? [];
    if (!Array.isArray(ecosystems)) {
      throw new Error(`${decision.stableId}: invalid ecosystems`);
    }

    const record: GeneratedProjectRecord = {
      stableId: decision.stableId,
      displayName: stringField(
        source.display_name,
        "display_name",
        decision.stableId,
      ),
      lifecycle,
      ownership,
      projectKind,
      ecosystems: ecosystems.map((item) =>
        stringField(item, "ecosystem", decision.stableId),
      ),
      publicationClass: decision.publicationClass,
      ...(decision.primaryStableId
        ? { primaryStableId: decision.primaryStableId }
        : {}),
    };
    return record;
  });

  const unapproved = [...sourceById.keys()].filter((id) => !decisionIds.has(id));
  if (unapproved.length > 0) {
    throw new Error(
      `registry contains projects without publication decisions: ${unapproved.join(", ")}`,
    );
  }

  records.sort((left, right) => left.stableId.localeCompare(right.stableId));
  assertSafeDocument(records);
  return records;
}

export function serializeProjectCatalog(records: GeneratedProjectRecord[]) {
  return `${JSON.stringify(records, null, 2)}\n`;
}

if (import.meta.main) {
  const options = parseArgs(Bun.argv.slice(2));
  if (!existsSync(options.registry)) {
    throw new Error(`project registry not found: ${options.registry}`);
  }

  const generated = serializeProjectCatalog(
    generateProjectCatalog(readFileSync(options.registry, "utf8")),
  );

  if (options.check) {
    if (!existsSync(options.output)) {
      throw new Error(`generated catalog not found: ${options.output}`);
    }
    if (readFileSync(options.output, "utf8") !== generated) {
      throw new Error("generated project catalog is stale");
    }
    console.log(`project catalog is current (${projectPublicationDecisions.length} entries)`);
  } else {
    writeFileSync(options.output, generated, "utf8");
    console.log(`wrote ${projectPublicationDecisions.length} projects to ${options.output}`);
  }
}
