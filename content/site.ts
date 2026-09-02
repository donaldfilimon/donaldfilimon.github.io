export const site = {
  name: "Donald Filimon",
  fullName: "Donald Joseph Filimon",
  role: "Independent AI systems engineer",
  location: "Land O’ Lakes, Florida",
  region: "United States",
  company: "The Donald Company",
  availability: "Working globally from Florida",
  email: "cbkshadow@icloud.com",
  url: "https://donaldfilimon.github.io/",
  domain: "https://donaldfilimon.com",
  github: "https://github.com/donaldfilimon",
  linkedIn: "https://linkedin.com/in/donaldfilimon",
  x: "https://x.com/underswitch",
  orgDonaldCompany: "https://github.com/donald-company",
  orgXfoss: "https://github.com/XFOSS",
  description:
    "Independent engineering for inspectable AI systems, developer frameworks, native applications, and evidence-gated products.",
  lede: "I turn technically difficult ideas into systems people can inspect, operate, and trust. That means architecture and implementation together, with provenance attached and claims bounded by evidence.",
  stack: ["Rust", "Swift", "TypeScript", "Python", "LLVM / MLIR"],
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#practice", label: "Practice" },
  { href: "/#contact", label: "Contact" },
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
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "abi",
    name: "ABI",
    kind: "runtime",
    stack: "Rust nightly",
    summary:
      "Rust-native runtime for local AI orchestration, model access, scheduling, MCP tools, memory, plugins, and claim-honest capability reporting.",
    href: "https://github.com/donaldfilimon/abi",
    docs: "https://donaldfilimon.github.io/abi/",
    public: true,
    featured: true,
  },
  {
    id: "wdbx",
    name: "WDBX",
    kind: "runtime",
    stack: "Rust",
    summary:
      "Provenance-aware episodic substrate beneath ABI, combining durable storage, causal structure, retrieval, and evidence-oriented contracts.",
    href: "https://github.com/donaldfilimon/wdbx",
    public: true,
    featured: true,
  },
  {
    id: "abbey",
    name: "Abbey",
    kind: "runtime",
    stack: "Rust CLI / TUI",
    summary:
      "Operator-controlled CLI and TUI for coordinated personas, skills, plugins, local memory, parallel work, and external agent backends.",
    href: "https://github.com/donaldfilimon/abbey",
    public: true,
    featured: true,
  },
  {
    id: "gama",
    name: "Gama",
    kind: "native",
    stack: "Swift",
    summary:
      "Modular declarative UI framework with one retained render tree across terminal, Apple, WebAssembly, C/Android, MLIR, and Embedded Swift hosts.",
    href: "https://github.com/donaldfilimon/gama",
    docs: "https://donaldfilimon.github.io/gama/",
    public: true,
    featured: true,
  },
  {
    id: "coreai",
    name: "CoreAI Assistant",
    kind: "native",
    stack: "SwiftUI · Foundation Models",
    summary:
      "On-device macOS coding assistant. Canonical home of the Swift Abbey stack after absorbing AbbeyCompanion. Private repository.",
    public: false,
    featured: false,
  },
  {
    id: "string",
    name: "String",
    kind: "native",
    stack: "SwiftUI · TextKit 2",
    summary:
      "Native macOS code editor with window-scoped workspaces, source-authoritative documents, and metadata kept separate from file contents. Private repository.",
    public: false,
    featured: true,
  },
  {
    id: "mixed",
    name: "Mixed",
    kind: "native",
    stack: "visionOS · RealityKit",
    summary:
      "Mixed-immersive AURORA-6 manufacturing facility built with RealityKit and a reproducible in-repository Swift package. Private repository.",
    public: false,
    featured: true,
  },
  {
    id: "mlai",
    name: "MLAI",
    kind: "product",
    stack: "Bun · Next.js · Expo",
    summary:
      "Privacy-first Apple Silicon product work spanning a Bun and Next.js web surface with an Expo mobile companion.",
    href: "https://github.com/donaldfilimon/MLAI-CORPORATION-WWW",
    public: true,
    featured: false,
  },
  {
    id: "custom-perfections",
    name: "Custom Perfections",
    kind: "product",
    stack: "TypeScript · Stripe",
    summary:
      "Commerce experience for configurable custom printing and personalized gifts, with launch state kept deliberately private. Private repository.",
    public: false,
    featured: false,
  },
  {
    id: "hydrocycle",
    name: "HydroCycle",
    kind: "lab",
    stack: "Bun · FastAPI · Cantera",
    summary:
      "Evidence-gated hydrogen-combustion environment that keeps proposed cycles, scientific-model limits, and validated test runs visibly separate.",
    href: "https://github.com/donaldfilimon/HydroCycle",
    docs: "https://donaldfilimon.github.io/HydroCycle/",
    public: true,
    featured: true,
  },
  {
    id: "cell-state",
    name: "Cell-State Adaptive Problem Solver",
    kind: "lab",
    stack: "Bun · WebGPU",
    summary:
      "Closed-loop adaptive solver laboratory with WebGPU simulation, reproducible scenarios, and explicit boundaries between observation and validation.",
    href: "https://github.com/donaldfilimon/cell-state-adaptive-bun-validated",
    public: true,
    featured: true,
  },
  {
    id: "nabu",
    name: "nabu",
    kind: "product",
    stack: "SvelteKit · D1",
    summary:
      "Marketing and advertising product architecture built on SvelteKit and Cloudflare D1, with its canonical public source maintained by AmmouraMe.",
    href: "https://github.com/AmmouraMe/nabu",
    public: true,
    featured: false,
  },
  {
    id: "minecraft",
    name: "minecraft-server-open",
    kind: "lab",
    stack: "Rust",
    summary:
      "Minecraft Java protocol server plus a protocol client for a game-playing agent. Private repository.",
    public: false,
    featured: false,
  },
];

export const services = [
  {
    id: "ai-systems-architecture",
    number: "01",
    title: "AI Systems Architecture",
    summary:
      "Shape model, memory, tool, governance, and evaluation layers into one inspectable system with explicit authority boundaries.",
    outputs: [
      "System and capability map",
      "Runtime and tool contracts",
      "Memory and evidence design",
      "Evaluation and governance gates",
    ],
  },
  {
    id: "applied-product-engineering",
    number: "02",
    title: "Applied Product Engineering",
    summary:
      "Move a technically unusual idea into a coherent product across web, Apple platforms, compilers, scientific services, and local workflows.",
    outputs: [
      "Working product slice",
      "Cross-platform architecture",
      "Interaction and state model",
      "Production-oriented handoff",
    ],
  },
  {
    id: "evidence-led-hardening",
    number: "03",
    title: "Evidence-Led Hardening",
    summary:
      "Turn an ambitious prototype into a system whose tests, artifacts, hosted state, and live behavior support the claims made about it.",
    outputs: [
      "Claims and risk inventory",
      "Reproducible validation gates",
      "Failure-mode hardening",
      "Evidence-backed delivery record",
    ],
  },
] as const;

export const credibility = [
  "AI runtimes",
  "Developer frameworks",
  "Apple platforms",
  "Scientific workflows",
] as const;

export const practice = [
  {
    title: "Systems",
    body: "Architecture and implementation stay in the same loop. Ownership is explicit, interfaces are inspectable, and tests support the claims made about the system.",
  },
  {
    title: "Memory",
    body: "Retrieval should preserve where a record came from, what followed, and why it is trusted. A generated guess does not become a stored fact by repetition.",
  },
  {
    title: "Native",
    body: "Interfaces should belong to their platform, from terminal workflows to SwiftUI and RealityKit. Local execution protects private work; network services remain explicit dependencies.",
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
