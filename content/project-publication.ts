import type { ProjectPublicationDecision } from "./project-types";

const decision = (
  stableId: string,
  publicationClass: ProjectPublicationDecision["publicationClass"],
  options: Omit<
    ProjectPublicationDecision,
    "stableId" | "publish" | "publicationClass"
  > = { approvedLinks: [] },
): ProjectPublicationDecision => ({
  stableId,
  publish: true,
  publicationClass,
  ...options,
});

export const projectPublicationDecisions: ProjectPublicationDecision[] = [
  decision("abbey", "featured", {
    approvedSummaryId: "abbey",
    approvedLinks: ["https://github.com/donaldfilimon/abbey"],
  }),
  decision("abbey-bot-rust", "active"),
  decision("abbey-companion", "archive", {
    primaryStableId: "core-ai-assistant",
    approvedLinks: [],
  }),
  decision("abbeybot-swift", "active"),
  decision("abbeybot-vapor-snapshot", "recovery", {
    primaryStableId: "abbeybot-swift",
    approvedLinks: [],
  }),
  decision("abi", "featured", {
    approvedSummaryId: "abi",
    approvedLinks: [
      "https://github.com/donaldfilimon/abi",
      "https://donaldfilimon.github.io/abi/",
    ],
  }),
  decision("agentic", "archive"),
  decision("alien-invasion", "archive"),
  decision("blender-config", "active"),
  decision("cell-machine", "experiment"),
  decision("cell-state-adaptive", "featured", {
    approvedSummaryId: "cell-state",
    approvedLinks: [
      "https://github.com/donaldfilimon/cell-state-adaptive-bun-validated",
    ],
  }),
  decision("core-ai-assistant", "active", {
    approvedSummaryId: "coreai",
    approvedLinks: [],
  }),
  decision("custom-perfections", "active", {
    approvedSummaryId: "custom-perfections",
    approvedLinks: [],
  }),
  decision("donald-portfolio-tsx", "archive", {
    primaryStableId: "donaldfilimoncom",
    approvedLinks: [],
  }),
  decision("donaldfilimoncom", "active"),
  decision("eagle-lsp", "reference"),
  decision("gama-active", "experiment", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("gama-swift", "archive", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("gama-framework", "featured", {
    approvedSummaryId: "gama",
    approvedLinks: [
      "https://github.com/donaldfilimon/gama",
      "https://donaldfilimon.github.io/gama/",
    ],
  }),
  decision("gama-framework-merged-checkout-20260824", "recovery", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("game-example", "archive"),
  decision("hydrocycle", "featured", {
    approvedSummaryId: "hydrocycle",
    approvedLinks: [
      "https://github.com/donaldfilimon/HydroCycle",
      "https://donaldfilimon.github.io/HydroCycle/",
    ],
  }),
  decision("invasion3d", "experiment"),
  decision("ladybird", "reference"),
  decision("lylex", "active"),
  decision("minecraft-server-open", "active", {
    approvedSummaryId: "minecraft",
    approvedLinks: [],
  }),
  decision("mlai", "active", {
    approvedSummaryId: "mlai",
    approvedLinks: ["https://github.com/donaldfilimon/MLAI-CORPORATION-WWW"],
  }),
  decision("mlai-website", "recovery", {
    primaryStableId: "mlai",
    approvedLinks: [],
  }),
  decision("nabu", "active", {
    approvedSummaryId: "nabu",
    approvedLinks: ["https://github.com/AmmouraMe/nabu"],
  }),
  decision("paint", "experiment"),
  decision("plugins", "active"),
  decision("project-registry", "active"),
  decision("roblox-server-craft", "archive"),
  decision("spacial3d", "archive"),
  decision("sqlite-docs", "active"),
  decision("swift-discord", "archive"),
  decision("string", "featured", {
    approvedSummaryId: "string",
    approvedLinks: [],
  }),
  decision("mixed", "featured", {
    approvedSummaryId: "mixed",
    approvedLinks: [],
  }),
  decision("mlai-design-handoff", "recovery", {
    primaryStableId: "mlai",
    approvedLinks: [],
  }),
  decision("wdbx-rust", "featured", {
    approvedSummaryId: "wdbx",
    approvedLinks: ["https://github.com/donaldfilimon/wdbx"],
  }),
  decision("wdbx-zig-scaffold", "recovery", {
    primaryStableId: "wdbx-rust",
    approvedLinks: [],
  }),
  decision("webpress", "active"),
  decision("workflows-starter-template", "active"),
  decision("would-you-rather-tfjs", "archive"),
  decision("xrlook", "archive"),
  decision("cger-english-2026q1", "archive"),
  decision("abbey-companion-recovery-4", "recovery", {
    primaryStableId: "core-ai-assistant",
    approvedLinks: [],
  }),
  decision("abby-ai-react19-video", "recovery"),
  decision("abi-swift-recovery", "recovery", {
    primaryStableId: "abi",
    approvedLinks: [],
  }),
  decision("agnostic-machine-pipeline", "archive"),
  decision("bmct-wolfram-verified", "archive"),
  decision("cell-state-adaptive-recovery", "recovery", {
    primaryStableId: "cell-state-adaptive",
    approvedLinks: [],
  }),
  decision("cell-state-adaptive-variant2-recovery", "recovery", {
    primaryStableId: "cell-state-adaptive",
    approvedLinks: [],
  }),
  decision("discordbm-vapor-bot-recovery", "recovery"),
  decision("gama-recovery-2", "recovery", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("gama-framework-recovery", "recovery", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("gama-recovery", "recovery", {
    primaryStableId: "gama-framework",
    approvedLinks: [],
  }),
  decision("green-square-bliss", "archive"),
  decision("mesh-terrain-unity", "archive"),
  decision("ml-public-ops-observation", "archive"),
  decision("simple-runner-starter", "archive"),
  decision("stripe-sample-code", "recovery"),
  decision("vapor-spec32", "recovery"),
  decision("would-you-rather-bun-ts-variant2", "recovery", {
    primaryStableId: "would-you-rather-tfjs",
    approvedLinks: [],
  }),
  decision("would-you-rather-bun-ts", "recovery", {
    primaryStableId: "would-you-rather-tfjs",
    approvedLinks: [],
  }),
];

export const publicationDecisionById = new Map(
  projectPublicationDecisions.map((item) => [item.stableId, item]),
);
