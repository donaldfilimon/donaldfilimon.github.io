export const site = {
  name: "Donald Filimon",
  fullName: "Donald Joseph Filimon",
  role: "Software engineer",
  location: "Ocala, Florida",
  region: "United States",
  company: "The Donald Company",
  email: "cbkshadow@icloud.com",
  url: "https://donaldfilimon.github.io/",
  domain: "https://donaldfilimon.com",
  github: "https://github.com/donaldfilimon",
  linkedIn: "https://linkedin.com/in/donaldfilimon",
  x: "https://x.com/underswitch",
  orgDonaldCompany: "https://github.com/donald-company",
  orgXfoss: "https://github.com/XFOSS",
  description:
    "Software engineer in Ocala, Florida. Local-first AI runtimes, compilers, and native systems.",
  lede: "I build local-first AI runtimes, compilers, and native systems. Provenance stays attached. The machine stays yours.",
  stack: ["Rust", "Swift", "TypeScript", "Bun", "LLVM / MLIR"],
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#practice", label: "Practice" },
  { href: "#contact", label: "Contact" },
] as const;

export type ProjectKind = "runtime" | "native" | "product" | "lab";

export type Project = {
  id: string;
  name: string;
  kind: ProjectKind;
  stack: string;
  summary: string;
  href?: string;
  docs?: string;
  public: boolean;
};

export const projects: Project[] = [
  {
    id: "abi",
    name: "ABI",
    kind: "runtime",
    stack: "Rust nightly",
    summary:
      "Cognitive and governance runtime: agents, contracts, MCP, and model runtime.",
    href: "https://github.com/donaldfilimon/abi",
    docs: "https://donaldfilimon.github.io/abi/",
    public: true,
  },
  {
    id: "wdbx",
    name: "WDBX",
    kind: "runtime",
    stack: "Rust",
    summary:
      "Provenance-aware episodic substrate beneath ABI. Memory is not a vector lookup. Extracted from ABI on 22 Aug 2026.",
    href: "https://github.com/donaldfilimon/wdbx",
    public: true,
  },
  {
    id: "abbey",
    name: "Abbey",
    kind: "runtime",
    stack: "Rust CLI / TUI",
    summary:
      "Hybrid persona CLI and TUI. Coordinated roles, skills, plugins, parallel lanes.",
    href: "https://github.com/donaldfilimon/abbey",
    public: true,
  },
  {
    id: "gama",
    name: "Gama",
    kind: "native",
    stack: "Swift",
    summary:
      "Declarative UI framework. One retained render tree across Apple, TUI, WASM, C-embed, and MLIR.",
    href: "https://github.com/donaldfilimon/gama",
    docs: "https://donaldfilimon.github.io/gama/",
    public: true,
  },
  {
    id: "coreai",
    name: "CoreAI Assistant",
    kind: "native",
    stack: "SwiftUI · Foundation Models",
    summary:
      "On-device macOS coding assistant. Canonical home of the Swift Abbey stack after absorbing AbbeyCompanion.",
    href: "https://github.com/donaldfilimon/CoreAIAssistant",
    public: true,
  },
  {
    id: "string",
    name: "String",
    kind: "native",
    stack: "SwiftUI · TextKit 2",
    summary:
      "Native macOS 27 code editor. Source files stay authoritative; SwiftData holds metadata only. Private repository.",
    public: false,
  },
  {
    id: "mixed",
    name: "Mixed",
    kind: "native",
    stack: "visionOS · RealityKit",
    summary:
      "Mixed-immersive AURORA-6 manufacturing facility. Xcode project plus in-repo Swift package.",
    href: "https://github.com/donaldfilimon/Mixed",
    public: true,
  },
  {
    id: "mlai",
    name: "MLAI",
    kind: "product",
    stack: "Bun · Next.js · Expo",
    summary:
      "Privacy-first Apple Silicon product line. Published monorepo MLAI-CORPORATION-WWW.",
    href: "https://github.com/donaldfilimon/MLAI-CORPORATION-WWW",
    public: true,
  },
  {
    id: "custom-perfections",
    name: "Custom Perfections",
    kind: "product",
    stack: "TypeScript · Stripe",
    summary:
      "Custom printing and personalized gifts. customperfections.com is an intentional coming-soon until launch.",
    href: "https://github.com/donaldfilimon/custom-perfections",
    public: true,
  },
  {
    id: "hydrocycle",
    name: "HydroCycle",
    kind: "lab",
    stack: "Bun · FastAPI · Cantera",
    summary:
      "Evidence-gated hydrogen-combustion simulator. Water never contributes chemical energy.",
    href: "https://github.com/donaldfilimon/HydroCycle",
    docs: "https://donaldfilimon.github.io/HydroCycle/",
    public: true,
  },
  {
    id: "cell-state",
    name: "Cell-state adaptive",
    kind: "lab",
    stack: "Bun · WebGPU",
    summary: "Closed-loop challenge solvers with a WebGPU lab simulation.",
    href: "https://github.com/donaldfilimon/cell-state-adaptive-bun-validated",
    public: true,
  },
  {
    id: "nabu",
    name: "nabu",
    kind: "product",
    stack: "SvelteKit · D1",
    summary: "Marketing and advertising architecture, tracking, and automation.",
    href: "https://github.com/donaldfilimon/nabu",
    public: true,
  },
  {
    id: "minecraft",
    name: "minecraft-server-open",
    kind: "lab",
    stack: "Rust",
    summary:
      "Minecraft Java protocol server plus a protocol client for a game-playing agent. Private repository.",
    public: false,
  },
];

export const practice = [
  {
    title: "Systems",
    body: "Rust, Swift, and compiler-shaped thinking. Ownership is explicit. Tests before confidence claims. Nightly where the repo pins it, stable where it does not.",
  },
  {
    title: "Memory",
    body: "Retrieval has to show its sources. WDBX keeps provenance on the episode. Agents do not get to launder a guess into a stored fact.",
  },
  {
    title: "Native",
    body: "Interfaces that belong on the machine: TUI, SwiftUI, RealityKit, Metal. Local inference when the problem is private. Cloud when it earns its keep.",
  },
] as const;

export const links = [
  { href: `mailto:${site.email}`, label: site.email },
  { href: site.github, label: "github.com/donaldfilimon" },
  { href: site.linkedIn, label: "linkedin.com/in/donaldfilimon" },
  { href: site.x, label: "x.com/underswitch" },
  { href: site.orgDonaldCompany, label: "github.com/donald-company" },
  { href: site.orgXfoss, label: "github.com/XFOSS" },
] as const;
