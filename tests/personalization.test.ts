import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";

import { projectCatalog } from "../content/project-catalog";
import {
  centroidForProjects,
  normalizeVector,
  PERSONALIZATION_FEATURE_DIMENSION,
  PERSONALIZATION_MODEL_URL,
  projectFeatureVector,
  scoreProjects,
  updatePreferenceVector,
} from "../lib/project-personalization";

const editorialOrder = [
  "abi",
  "wdbx-rust",
  "abbey",
  "gama-framework",
  "string",
  "mixed",
  "hydrocycle",
  "cell-state-adaptive",
];

test("project feature vectors are stable, normalized, and correctly dimensioned", () => {
  const project = projectCatalog.find((item) => item.stableId === "abi");
  expect(project).toBeTruthy();
  const first = projectFeatureVector(project!);
  const second = projectFeatureVector(project!);
  expect(first).toEqual(second);
  expect(first).toHaveLength(PERSONALIZATION_FEATURE_DIMENSION);
  expect(Math.abs(Math.sqrt(first.reduce((sum, value) => sum + value ** 2, 0)) - 1)).toBeLessThan(
    0.000001,
  );
});

test("positive and negative signals move the preference vector in opposite directions", () => {
  const abi = projectCatalog.find((item) => item.stableId === "abi")!;
  const zero = Array(PERSONALIZATION_FEATURE_DIMENSION).fill(0) as number[];
  const signal = centroidForProjects([abi]);
  const positive = updatePreferenceVector(zero, signal, 1);
  const negative = updatePreferenceVector(zero, signal, -1);
  for (let index = 0; index < signal.length; index += 1) {
    expect(positive[index]).toBeCloseTo(signal[index], 12);
    expect(negative[index]).toBeCloseTo(-signal[index], 12);
  }
  expect(normalizeVector(zero)).toEqual(zero);
});

test("the same stored weights produce deterministic ranking with editorial tie-breaks", () => {
  const abi = projectCatalog.find((item) => item.stableId === "abi")!;
  const preference = projectFeatureVector(abi);
  const eligible = projectCatalog.filter((project) =>
    ["featured", "active", "experiment"].includes(project.publicationClass),
  );
  const first = scoreProjects(eligible, preference, editorialOrder).map(
    (item) => item.project.stableId,
  );
  const second = scoreProjects(eligible, preference, editorialOrder).map(
    (item) => item.project.stableId,
  );
  expect(first).toEqual(second);
  expect(first[0]).toBe("abi");
});

test("personalizer dynamically imports TensorFlow only after consent and has no transport", () => {
  const source = readFileSync("components/site/personalized-work.tsx", "utf8");
  const modelSource = readFileSync("lib/project-personalization.ts", "utf8");
  expect(source).toContain('await import("@tensorflow/tfjs")');
  expect(source).not.toMatch(/^import\s+.*["']@tensorflow\/tfjs["'];?$/m);
  expect(modelSource).toContain(PERSONALIZATION_MODEL_URL);
  expect(source).toContain('await tf.setBackend("cpu")');
  expect(source).toContain("count < 2");
  expect(source).toContain("model.save(PERSONALIZATION_MODEL_URL)");
  expect(source).toContain("tf.io.removeModel(PERSONALIZATION_MODEL_URL)");
  expect(source).toContain("model-owned LayerVariable instances");
  expect(source).not.toContain("fetch(");
  expect(source).not.toContain("sendBeacon");
  expect(source).not.toContain("XMLHttpRequest");
});

test("personalization and atlas controls carry accessible names and reset behavior", () => {
  const personalizer = readFileSync("components/site/personalized-work.tsx", "utf8");
  const atlas = readFileSync("components/site/project-atlas.tsx", "utf8");
  expect(personalizer).toContain("Personalize recommendations");
  expect(personalizer).toContain("Pause personalization");
  expect(personalizer).toContain("Reset local model");
  expect(personalizer).toContain("More projects like");
  expect(personalizer).toContain("Fewer projects like");
  expect(personalizer).toContain('aria-live="polite"');
  expect(atlas).toContain("Search projects");
  expect(atlas).toContain("Reset atlas");
  expect(atlas).toContain('aria-live="polite"');
  expect(atlas).toContain("min-h-11");
});
