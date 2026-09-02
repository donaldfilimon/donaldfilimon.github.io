import type { PublicProjectRecord } from "@/content/project-types";

export const PERSONALIZATION_SCHEMA_VERSION = 1;
export const PERSONALIZATION_MODEL_URL =
  "indexeddb://donald-portfolio-ranker-v1";
export const PERSONALIZATION_STATE_KEY = "donald-portfolio-personalization-v1";
export const PORTFOLIO_SIGNAL_EVENT = "portfolio:preference-signal";

const lifecycleFeatures = [
  "active",
  "experimental",
  "archived",
  "retired",
  "external",
] as const;
const ownershipFeatures = ["personal", "company", "external"] as const;
const kindFeatures = ["primary", "exceptional", "reference"] as const;
const ecosystemFeatures = [
  "rust",
  "swift",
  "web",
  "python",
  "systems",
  "scientific",
  "other",
] as const;

export const PERSONALIZATION_FEATURE_LABELS = [
  ...lifecycleFeatures.map((value) => `lifecycle:${value}`),
  ...ownershipFeatures.map((value) => `ownership:${value}`),
  ...kindFeatures.map((value) => `kind:${value}`),
  ...ecosystemFeatures.map((value) => `ecosystem:${value}`),
  "flag:featured",
  "flag:repository",
  "flag:documentation",
] as const;

export const PERSONALIZATION_FEATURE_DIMENSION =
  PERSONALIZATION_FEATURE_LABELS.length;

export type PortfolioSignalDetail = {
  stableIds: string[];
  weight: number;
};

export type PersonalizationStorageState = {
  enabled: boolean;
  schemaVersion: number;
  signalCount: number;
};

function oneHot<T extends string>(values: readonly T[], selected: string) {
  return values.map((value) => (value === selected ? 1 : 0));
}

function ecosystemBucket(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "rust") return "rust";
  if (normalized === "swift") return "swift";
  if (normalized === "typescript" || normalized === "javascript") return "web";
  if (normalized === "python") return "python";
  if (["cpp", "csharp", "zig"].includes(normalized)) return "systems";
  if (normalized === "wolfram") return "scientific";
  return "other";
}

export function normalizeVector(vector: number[]) {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) return vector.map(() => 0);
  return vector.map((value) => value / magnitude);
}

export function projectFeatureVector(project: PublicProjectRecord) {
  const ecosystemBuckets = new Set(project.ecosystems.map(ecosystemBucket));
  const vector = [
    ...oneHot(lifecycleFeatures, project.lifecycle),
    ...oneHot(ownershipFeatures, project.ownership),
    ...oneHot(kindFeatures, project.projectKind),
    ...ecosystemFeatures.map((value) =>
      ecosystemBuckets.has(value) ? 1 : 0,
    ),
    project.featured ? 1 : 0,
    project.links.some((link) => link.type === "repository") ? 1 : 0,
    project.links.some((link) => link.type === "documentation") ? 1 : 0,
  ];
  if (vector.length !== PERSONALIZATION_FEATURE_DIMENSION) {
    throw new Error("project feature schema has an invalid dimension");
  }
  return normalizeVector(vector);
}

export function centroidForProjects(projects: PublicProjectRecord[]) {
  if (projects.length === 0) {
    return Array(PERSONALIZATION_FEATURE_DIMENSION).fill(0) as number[];
  }
  const total = Array(PERSONALIZATION_FEATURE_DIMENSION).fill(0) as number[];
  for (const project of projects) {
    const vector = projectFeatureVector(project);
    for (let index = 0; index < total.length; index += 1) {
      total[index] += vector[index];
    }
  }
  return normalizeVector(total.map((value) => value / projects.length));
}

export function updatePreferenceVector(
  current: number[],
  signal: number[],
  weight: number,
) {
  if (
    current.length !== PERSONALIZATION_FEATURE_DIMENSION ||
    signal.length !== PERSONALIZATION_FEATURE_DIMENSION
  ) {
    throw new Error("personalization vector has an invalid dimension");
  }
  const boundedWeight = Math.max(-1, Math.min(1, weight));
  const retention = 0.85;
  const learningRate = 0.15;
  return normalizeVector(
    current.map(
      (value, index) =>
        retention * value + learningRate * boundedWeight * signal[index],
    ),
  );
}

export function scoreProjects(
  projects: PublicProjectRecord[],
  preference: number[],
  editorialOrder: readonly string[],
) {
  const order = new Map(editorialOrder.map((stableId, index) => [stableId, index]));
  return projects
    .map((project, originalIndex) => ({
      project,
      originalIndex,
      score: projectFeatureVector(project).reduce(
        (sum, value, index) => sum + value * (preference[index] ?? 0),
        0,
      ),
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        (order.get(left.project.stableId) ?? Number.MAX_SAFE_INTEGER) -
          (order.get(right.project.stableId) ?? Number.MAX_SAFE_INTEGER) ||
        left.originalIndex - right.originalIndex,
    );
}

export function dispatchPortfolioSignal(detail: PortfolioSignalDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PortfolioSignalDetail>(PORTFOLIO_SIGNAL_EVENT, { detail }),
  );
}
