"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, RotateCcw, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicProjectRecord } from "@/content/project-types";
import {
  centroidForProjects,
  dispatchPortfolioSignal,
  PERSONALIZATION_FEATURE_DIMENSION,
  PERSONALIZATION_MODEL_URL,
  PERSONALIZATION_SCHEMA_VERSION,
  PERSONALIZATION_STATE_KEY,
  PORTFOLIO_SIGNAL_EVENT,
  projectFeatureVector,
  type PersonalizationStorageState,
  type PortfolioSignalDetail,
  updatePreferenceVector,
} from "@/lib/project-personalization";

type TensorFlow = typeof import("@tensorflow/tfjs");
type RankerModel = import("@tensorflow/tfjs").LayersModel;

const editorialOrder = [
  "abi",
  "wdbx-rust",
  "abbey",
  "gama-framework",
  "string",
  "mixed",
  "hydrocycle",
  "cell-state-adaptive",
] as const;

const defaultRecommendationIds = editorialOrder.slice(0, 4);

function initialPreference() {
  return Array(PERSONALIZATION_FEATURE_DIMENSION).fill(0) as number[];
}

function readStorageState(): PersonalizationStorageState | null {
  try {
    const raw = localStorage.getItem(PERSONALIZATION_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersonalizationStorageState>;
    if (
      typeof parsed.enabled !== "boolean" ||
      typeof parsed.schemaVersion !== "number" ||
      typeof parsed.signalCount !== "number"
    ) {
      return null;
    }
    return parsed as PersonalizationStorageState;
  } catch {
    return null;
  }
}

function writeStorageState(state: PersonalizationStorageState) {
  try {
    localStorage.setItem(PERSONALIZATION_STATE_KEY, JSON.stringify(state));
  } catch {
    // IndexedDB remains the model authority; storage failures use session state.
  }
}

function createRanker(tf: TensorFlow, weights: number[]) {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [PERSONALIZATION_FEATURE_DIMENSION],
      useBias: false,
      trainable: false,
    }),
  );
  const warmup = model.predict(
    tf.zeros([1, PERSONALIZATION_FEATURE_DIMENSION]),
  ) as import("@tensorflow/tfjs").Tensor;
  warmup.dispose();
  const tensor = tf.tensor2d(weights, [PERSONALIZATION_FEATURE_DIMENSION, 1]);
  model.setWeights([tensor]);
  tensor.dispose();
  return model;
}

function weightsFromModel(model: RankerModel) {
  const tensors = model.getWeights();
  // TensorFlow.js returns model-owned LayerVariable instances here. Disposing
  // them would also dispose the loaded model's kernel before prediction.
  return Array.from(tensors[0].dataSync());
}

export function PersonalizedWork({ projects }: { projects: PublicProjectRecord[] }) {
  const eligible = useMemo(
    () =>
      projects.filter((project) =>
        ["featured", "active", "experiment"].includes(project.publicationClass),
      ),
    [projects],
  );
  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.stableId, project])),
    [projects],
  );
  const [enabled, setEnabled] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [signalCount, setSignalCount] = useState(0);
  const [recommendationIds, setRecommendationIds] = useState<string[]>([
    ...defaultRecommendationIds,
  ]);
  const [status, setStatus] = useState(
    "Editorial recommendations are active. Personalization is off.",
  );
  const tfRef = useRef<TensorFlow | null>(null);
  const modelRef = useRef<RankerModel | null>(null);
  const weightsRef = useRef<number[]>(initialPreference());
  const enabledRef = useRef(false);
  const initializingRef = useRef(false);
  const signalCountRef = useRef(0);
  const persistenceRef = useRef(true);
  const queueRef = useRef(Promise.resolve());

  const setEditorialRecommendations = useCallback(() => {
    setRecommendationIds([...defaultRecommendationIds]);
  }, []);

  const rankWithModel = useCallback(
    (tf: TensorFlow, model: RankerModel, count: number) => {
      if (count < 2) {
        setEditorialRecommendations();
        return;
      }
      const matrix = eligible.map(projectFeatureVector);
      const scores = tf.tidy(() => {
        const input = tf.tensor2d(matrix, [matrix.length, PERSONALIZATION_FEATURE_DIMENSION]);
        const output = model.predict(input) as import("@tensorflow/tfjs").Tensor;
        return Array.from(output.dataSync());
      });
      const order = new Map<string, number>(
        editorialOrder.map((stableId, index) => [stableId, index]),
      );
      const ranked = eligible
        .map((project, index) => ({ project, score: scores[index], index }))
        .sort(
          (left, right) =>
            right.score - left.score ||
            (order.get(left.project.stableId) ?? Number.MAX_SAFE_INTEGER) -
              (order.get(right.project.stableId) ?? Number.MAX_SAFE_INTEGER) ||
            left.index - right.index,
        )
        .slice(0, 4)
        .map(({ project }) => project.stableId);
      setRecommendationIds(ranked);
    },
    [eligible, setEditorialRecommendations],
  );

  const initialize = useCallback(
    async (resume: boolean) => {
      if (initializingRef.current || enabledRef.current) return;
      initializingRef.current = true;
      setInitializing(true);
      setStatus("Initializing the on-device ranker…");
      try {
        const tf = await import("@tensorflow/tfjs");
        tfRef.current = tf;
        await tf.setBackend("cpu");
        await tf.ready();

        const stored = readStorageState();
        if (stored && stored.schemaVersion !== PERSONALIZATION_SCHEMA_VERSION) {
          try {
            await tf.io.removeModel(PERSONALIZATION_MODEL_URL);
          } catch {
            // An absent or blocked old model is already effectively reset.
          }
          localStorage.removeItem(PERSONALIZATION_STATE_KEY);
        }

        let model: RankerModel;
        let persistenceAvailable = true;
        if (resume && stored?.schemaVersion === PERSONALIZATION_SCHEMA_VERSION) {
          try {
            model = await tf.loadLayersModel(PERSONALIZATION_MODEL_URL);
            weightsRef.current = weightsFromModel(model);
          } catch {
            model = createRanker(tf, initialPreference());
            weightsRef.current = initialPreference();
            persistenceAvailable = false;
          }
        } else {
          model = createRanker(tf, initialPreference());
          weightsRef.current = initialPreference();
          try {
            await model.save(PERSONALIZATION_MODEL_URL);
          } catch {
            persistenceAvailable = false;
          }
        }

        modelRef.current?.dispose();
        modelRef.current = model;
        persistenceRef.current = persistenceAvailable;
        const nextCount =
          resume && stored?.schemaVersion === PERSONALIZATION_SCHEMA_VERSION
            ? stored.signalCount
            : 0;
        signalCountRef.current = nextCount;
        setSignalCount(nextCount);
        enabledRef.current = true;
        setEnabled(true);
        writeStorageState({
          enabled: true,
          schemaVersion: PERSONALIZATION_SCHEMA_VERSION,
          signalCount: nextCount,
        });
        rankWithModel(tf, model, nextCount);
        setStatus(
          persistenceAvailable
            ? "Personalization is on. The model stays in this browser’s IndexedDB."
            : "Personalization is on for this session. Browser storage is unavailable.",
        );
      } catch {
        enabledRef.current = false;
        setEnabled(false);
        setEditorialRecommendations();
        setStatus(
          "The on-device ranker could not start. Editorial recommendations remain available.",
        );
      } finally {
        initializingRef.current = false;
        setInitializing(false);
      }
    },
    [rankWithModel, setEditorialRecommendations],
  );

  const applySignal = useCallback(
    async (detail: PortfolioSignalDetail) => {
      if (!enabledRef.current || detail.stableIds.length === 0) return;
      const tf = tfRef.current;
      const model = modelRef.current;
      if (!tf || !model) return;
      const selected = detail.stableIds
        .map((stableId) => projectById.get(stableId))
        .filter((project): project is PublicProjectRecord => Boolean(project));
      if (selected.length === 0) return;

      const signal = centroidForProjects(selected);
      const nextWeights = updatePreferenceVector(
        weightsRef.current,
        signal,
        detail.weight,
      );
      const tensor = tf.tensor2d(nextWeights, [PERSONALIZATION_FEATURE_DIMENSION, 1]);
      model.setWeights([tensor]);
      tensor.dispose();
      weightsRef.current = nextWeights;

      const nextCount = signalCountRef.current + 1;
      signalCountRef.current = nextCount;
      setSignalCount(nextCount);
      rankWithModel(tf, model, nextCount);

      if (persistenceRef.current) {
        try {
          await model.save(PERSONALIZATION_MODEL_URL);
        } catch {
          persistenceRef.current = false;
          setStatus(
            "Recommendations updated for this session, but browser storage became unavailable.",
          );
        }
      }
      writeStorageState({
        enabled: true,
        schemaVersion: PERSONALIZATION_SCHEMA_VERSION,
        signalCount: nextCount,
      });
    },
    [projectById, rankWithModel],
  );

  useEffect(() => {
    const stored = readStorageState();
    if (!stored?.enabled) return;
    const timeout = window.setTimeout(() => void initialize(true), 0);
    return () => window.clearTimeout(timeout);
  }, [initialize]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PortfolioSignalDetail>).detail;
      if (!detail) return;
      queueRef.current = queueRef.current.then(() => applySignal(detail));
    };
    window.addEventListener(PORTFOLIO_SIGNAL_EVENT, handler);
    return () => window.removeEventListener(PORTFOLIO_SIGNAL_EVENT, handler);
  }, [applySignal]);

  useEffect(
    () => () => {
      modelRef.current?.dispose();
      modelRef.current = null;
    },
    [],
  );

  function pause() {
    enabledRef.current = false;
    setEnabled(false);
    setEditorialRecommendations();
    writeStorageState({
      enabled: false,
      schemaVersion: PERSONALIZATION_SCHEMA_VERSION,
      signalCount: signalCountRef.current,
    });
    setStatus("Personalization is paused. The local model is retained until reset.");
  }

  async function reset() {
    enabledRef.current = false;
    setEnabled(false);
    signalCountRef.current = 0;
    setSignalCount(0);
    weightsRef.current = initialPreference();
    modelRef.current?.dispose();
    modelRef.current = null;
    try {
      const tf = tfRef.current ?? (await import("@tensorflow/tfjs"));
      tfRef.current = tf;
      await tf.io.removeModel(PERSONALIZATION_MODEL_URL);
    } catch {
      // Removing an absent or inaccessible model still leaves no usable local model.
    }
    localStorage.removeItem(PERSONALIZATION_STATE_KEY);
    setEditorialRecommendations();
    setStatus("Local recommendations and consent were reset.");
  }

  const recommendations = recommendationIds
    .map((stableId) => projectById.get(stableId))
    .filter((project): project is PublicProjectRecord => Boolean(project));

  return (
    <section aria-labelledby="personalized-work-title" className="border-y bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
              ON-DEVICE LENS
            </p>
            <h2
              className="font-heading mt-2 text-3xl font-extrabold tracking-tight"
              id="personalized-work-title"
            >
              Recommended for you
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Optional TensorFlow.js ranking can learn from the project signals you choose.
              Processing stays on this device. No analytics, identifiers, or interaction
              history are sent anywhere.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!enabled ? (
              <Button
                className="min-h-11"
                disabled={initializing}
                onClick={() => void initialize(signalCountRef.current > 0)}
                type="button"
              >
                <Sparkles aria-hidden="true" />
                {initializing
                  ? "Starting on-device model…"
                  : signalCount > 0
                    ? "Resume personalization"
                    : "Personalize recommendations"}
              </Button>
            ) : (
              <Button className="min-h-11" onClick={pause} type="button" variant="outline">
                <Pause aria-hidden="true" />
                Pause personalization
              </Button>
            )}
            {(enabled || signalCount > 0) && (
              <Button className="min-h-11" onClick={() => void reset()} type="button" variant="ghost">
                <RotateCcw aria-hidden="true" />
                Reset local model
              </Button>
            )}
          </div>
        </div>

        <p aria-live="polite" className="mt-5 font-mono text-xs text-muted-foreground">
          {status} {enabled ? `${signalCount} preference signals applied.` : ""}
        </p>

        <div className="recommendation-grid mt-8">
          {recommendations.map((project) => (
            <article className="recommendation-card" key={project.stableId}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-xl font-bold" translate="no">
                  {project.displayName}
                </h3>
                <Badge variant={project.featured ? "default" : "outline"}>
                  {project.publicationClass}
                </Badge>
              </div>
              <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">
                {project.summary ??
                  `${project.lifecycle} ${project.projectKind} work across ${
                    project.ecosystems.join(", ") || "multiple systems"
                  }.`}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
                {project.links.map((link) => (
                  <a
                    className="inline-flex min-h-11 items-center text-sm text-primary underline-offset-4 hover:underline"
                    href={link.href}
                    key={link.href}
                    onClick={() =>
                      dispatchPortfolioSignal({ stableIds: [project.stableId], weight: 0.5 })
                    }
                  >
                    {link.label}
                  </a>
                ))}
                {enabled ? (
                  <div className="ml-auto flex gap-1" aria-label={`Tune ${project.displayName} recommendations`}>
                    <Button
                      aria-label={`More projects like ${project.displayName}`}
                      className="min-h-11 min-w-11"
                      onClick={() =>
                        dispatchPortfolioSignal({ stableIds: [project.stableId], weight: 1 })
                      }
                      size="icon"
                      title="More like this"
                      type="button"
                      variant="ghost"
                    >
                      <ThumbsUp aria-hidden="true" />
                    </Button>
                    <Button
                      aria-label={`Fewer projects like ${project.displayName}`}
                      className="min-h-11 min-w-11"
                      onClick={() =>
                        dispatchPortfolioSignal({ stableIds: [project.stableId], weight: -1 })
                      }
                      size="icon"
                      title="Less like this"
                      type="button"
                      variant="ghost"
                    >
                      <ThumbsDown aria-hidden="true" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
