export type ProjectKind = 'ai-systems' | 'native-systems' | 'product' | 'lab';

export type LinkKind =
  | 'repository'
  | 'documentation'
  | 'product'
  | 'email'
  | 'social';

export type ExternalLink = {
  label: string;
  href: string;
  kind: LinkKind;
};

export type EvidenceItem = {
  label: string;
  detail: string;
};

export type ArchitectureNode = {
  label: string;
  detail: string;
};

export type ProjectSummary = {
  slug: string;
  name: string;
  shortName?: string;
  kind: ProjectKind;
  kindLabel: string;
  featured: boolean;
  visibility: 'public' | 'private';
  thesis: string;
  summary: string;
  stack: string[];
  accent: 'acid' | 'blue' | 'violet' | 'orange';
  links: ExternalLink[];
};

export type CaseStudy = ProjectSummary & {
  index: string;
  challenge: string;
  role: string;
  constraints: string[];
  approach: string[];
  decisions: string[];
  outcomes: string[];
  evidence: EvidenceItem[];
  architecture: ArchitectureNode[];
  status: string;
  serviceSlug: ServiceOffering['slug'];
};

export type ServiceOffering = {
  slug: 'ai-systems-architecture' | 'applied-product-engineering' | 'evidence-led-hardening';
  number: string;
  title: string;
  summary: string;
  fit: string[];
  outputs: string[];
  relatedProjects: string[];
};

export type SiteProfile = {
  name: string;
  fullName: string;
  role: string;
  company: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  alternateGithub: string;
  sponsors: string;
  linkedIn: string;
  description: string;
  disciplines: string[];
};

export const profile: SiteProfile = {
  name: 'Donald Filimon',
  fullName: 'Donald Joseph Filimon',
  role: 'Software engineer · AI, Swift & LLVM',
  company: 'The Donald Company',
  location: 'Land O’ Lakes, Florida',
  availability: 'Working globally from Florida',
  email: 'cbkshadow@icloud.com',
  github: 'https://github.com/donaldfilimon',
  alternateGithub: 'https://github.com/underswitchx',
  sponsors: 'https://github.com/sponsors/donaldfilimon',
  linkedIn: 'https://linkedin.com/in/donaldfilimon',
  description:
    'Software engineering across agentic platforms, compiler infrastructure, native applications, and evidence-gated products.',
  disciplines: ['Rust', 'Swift', 'TypeScript', 'Python', 'LLVM / MLIR'],
};

export const services: ServiceOffering[] = [
  {
    slug: 'ai-systems-architecture',
    number: '01',
    title: 'AI Systems Architecture',
    summary:
      'Shape model, memory, tool, governance, and evaluation layers into one inspectable system with explicit authority boundaries.',
    fit: [
      'An agent prototype needs a dependable runtime architecture.',
      'Memory and retrieval need provenance rather than similarity alone.',
      'Tool use, permissions, and model claims need enforceable boundaries.',
    ],
    outputs: [
      'System and capability map',
      'Runtime and tool contracts',
      'Memory and evidence design',
      'Evaluation and governance gates',
    ],
    relatedProjects: ['abi', 'abbey', 'wdbx'],
  },
  {
    slug: 'applied-product-engineering',
    number: '02',
    title: 'Applied Product Engineering',
    summary:
      'Move a difficult idea into a coherent product across web, Apple platforms, compilers, scientific services, and local workflows.',
    fit: [
      'A technically unusual product needs architecture and implementation together.',
      'One product must span native, web, service, or embedded surfaces.',
      'The experience must expose complex machinery without overwhelming its user.',
    ],
    outputs: [
      'Working product slice',
      'Cross-platform architecture',
      'Interaction and state model',
      'Production-oriented handoff',
    ],
    relatedProjects: ['gama', 'string', 'mixed'],
  },
  {
    slug: 'evidence-led-hardening',
    number: '03',
    title: 'Evidence-Led Hardening',
    summary:
      'Turn an ambitious prototype into a system whose tests, artifacts, hosted state, and live behavior support the claims made about it.',
    fit: [
      'A prototype works, but its guarantees are difficult to explain or reproduce.',
      'Scientific or AI behavior needs bounded, falsifiable acceptance criteria.',
      'Privacy, failure handling, and deployment evidence need to be made explicit.',
    ],
    outputs: [
      'Claims and risk inventory',
      'Reproducible validation gates',
      'Failure-mode hardening',
      'Evidence-backed delivery record',
    ],
    relatedProjects: ['hydrocycle', 'cell-state-adaptive', 'wdbx'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'abi',
    name: 'ABI',
    kind: 'ai-systems',
    kindLabel: 'AI system',
    featured: true,
    visibility: 'public',
    thesis: 'A claim-honest cognitive and governance runtime for local AI systems.',
    summary:
      'ABI brings model runtime, scheduling, MCP tools, memory, plugins, and operational diagnostics into a Rust-native framework with explicit capability boundaries.',
    stack: ['Rust nightly', 'MCP', 'Local inference', 'Governance'],
    accent: 'acid',
    index: '01',
    challenge:
      'Agent systems often blur together model capability, tool access, memory, and deployment state. ABI needed to make those layers composable without letting a convenient interface overstate what the runtime can actually do.',
    role:
      'System architecture, Rust implementation, capability contracts, developer tooling, validation design, and external-claims discipline.',
    constraints: [
      'Local-first operation with optional providers rather than hidden cloud dependence.',
      'Feature-disabled paths must degrade explicitly instead of simulating success.',
      'Tool and model authority must remain visible to the operator.',
      'Accelerator reporting must distinguish detection from actual kernel execution.',
    ],
    approach: [
      'Separate cognitive, scheduling, model, memory, plugin, and transport responsibilities into bounded crates.',
      'Expose the same runtime through CLI, diagnostic TUI, and contract-covered MCP tools.',
      'Represent current, partial, and proposed capabilities independently so roadmap intent cannot become a shipped claim.',
    ],
    decisions: [
      'Use the repository-pinned Rust toolchain and one primary validation entry point.',
      'Keep HTTP/SSE optional and loopback-oriented while stdio remains the primary MCP transport.',
      'Require callers to opt into persistence rather than storing every completion implicitly.',
    ],
    outcomes: [
      'A coherent local runtime surface for models, scheduled work, tools, plugins, and WDBX-backed memory.',
      'Machine-readable help and diagnostics that make automation and operator inspection share one contract.',
      'Explicit degraded results when optional features are unavailable.',
    ],
    evidence: [
      { label: 'Repository gate', detail: 'Formatting, lint, workspace tests, builds, and documentation run through the project-owned check workflow.' },
      { label: 'Contract surface', detail: 'Core and MCP behavior is covered by contract and golden-path tests.' },
      { label: 'Claims boundary', detail: 'External collateral is governed by a repository claims audit that names unsupported statements.' },
    ],
    architecture: [
      { label: 'Operator', detail: 'CLI · TUI · MCP client' },
      { label: 'ABI runtime', detail: 'Governance · scheduler · tools' },
      { label: 'Model layer', detail: 'Local and explicit provider paths' },
      { label: 'WDBX', detail: 'Memory · evidence · provenance' },
    ],
    status:
      'Active public framework. The repository distinguishes implemented foundations from partial integrations and proposed capability work.',
    serviceSlug: 'ai-systems-architecture',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/abi', kind: 'repository' },
      { label: 'Documentation', href: 'https://donaldfilimon.github.io/abi/', kind: 'documentation' },
    ],
  },
  {
    slug: 'abbey',
    name: 'Abbey',
    kind: 'ai-systems',
    kindLabel: 'AI interface',
    featured: true,
    visibility: 'public',
    thesis: 'An empathetic, operator-controlled interface for coordinated AI work.',
    summary:
      'Abbey is a Rust CLI and TUI that coordinates personas, skills, plugins, local memory, parallel lanes, and external agent backends without pretending that the interface owns every capability it can invoke.',
    stack: ['Rust', 'CLI / TUI', 'Local daemon', 'Agent routing'],
    accent: 'violet',
    index: '02',
    challenge:
      'A useful agent interface must feel coherent across many tools while remaining honest about which runtime executes a request, what permissions exist, and which capabilities are only planned.',
    role:
      'Product architecture, persona design, Rust implementation, CLI/TUI experience, capability ledger, and safe operating model.',
    constraints: [
      'Multiple external executors have different flags, sessions, and trust boundaries.',
      'Local control must be allowlisted and confirmation-gated.',
      'Capability status must be generated from a canonical source rather than hand-maintained marketing copy.',
      'Private memory and runtime state must stay with the operator.',
    ],
    approach: [
      'Normalize common agent workflows behind one interaction model while retaining backend identity.',
      'Pair a human-friendly persona layer with explicit claims, runtime, and out-of-scope commands.',
      'Use an owner-only local daemon for narrowly typed status and durable task operations.',
    ],
    decisions: [
      'Keep local commands useful even when no generation backend is installed.',
      'Surface refused and proposed capabilities as first-class outcomes.',
      'Separate empathetic Abbey, direct Aviva, and orchestration/governance responsibilities.',
    ],
    outcomes: [
      'One local interface for planning, review, sessions, skills, plugins, memory, and agent routing.',
      'A generated capability ledger that keeps interface copy synchronized with implementation status.',
      'Clear runtime attribution for work delegated to external tools.',
    ],
    evidence: [
      { label: 'Claims ledger', detail: 'Current, partial, proposed, blocked, and out-of-scope capabilities are maintained as an executable project surface.' },
      { label: 'Project gate', detail: 'The modular Rust implementation is validated through its repository-owned check workflow.' },
      { label: 'Local control', detail: 'OS actions use an allowlist and explicit confirmation boundary.' },
    ],
    architecture: [
      { label: 'Human intent', detail: 'Abbey · Aviva · operator choice' },
      { label: 'Abbey interface', detail: 'CLI · TUI · session model' },
      { label: 'Execution lanes', detail: 'Local tools · external agents' },
      { label: 'Evidence layer', detail: 'Claims · memory · outcomes' },
    ],
    status:
      'Active public CLI/TUI. Its own capability ledger is the authority for what is current, partial, proposed, blocked, or intentionally out of scope.',
    serviceSlug: 'ai-systems-architecture',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/abbey', kind: 'repository' },
    ],
  },
  {
    slug: 'wdbx',
    name: 'WDBX',
    kind: 'ai-systems',
    kindLabel: 'Memory substrate',
    featured: true,
    visibility: 'public',
    thesis: 'Memory that preserves what happened, why it happened, and why a record is trusted.',
    summary:
      'WDBX is the provenance-aware episodic substrate beneath ABI, combining durable storage, causal structure, retrieval, and evidence-oriented contracts without equating memory with vector lookup.',
    stack: ['Rust', 'MVCC', 'Causal DAG', 'WAL / segments'],
    accent: 'orange',
    index: '03',
    challenge:
      'Similarity search can retrieve related text but cannot, by itself, explain context, causal dependencies, outcomes, versions, constraints, or trust. WDBX needed a storage foundation that could carry those relationships forward.',
    role:
      'Substrate architecture, repository extraction, Rust implementation, compatibility strategy, episodic contracts, and conformance framing.',
    constraints: [
      'ABI and Abbey consume the same path-based Rust types, making repository layout load-bearing.',
      'Stored data, credentials, and operator state remain private even though the source is public.',
      'Compatibility prevents silently reinterpreting older record formats.',
      'Structural storage capability must not be presented as complete evidence-weighted memory.',
    ],
    approach: [
      'Combine MVCC, CRC-framed recovery, content addressing, causal audit structure, and pluggable retrieval seams.',
      'Preserve extraction history so the substrate can evolve independently without losing provenance.',
      'Document missing constitutional and evidence-layer semantics as explicit non-claims.',
    ],
    decisions: [
      'Keep existing crate names to avoid needless type and consumer churn.',
      'Fail new episode writes closed when policy, identity, replay, consent, or budget invariants drift.',
      'Treat hosted database and production federation semantics as separate, unproven layers.',
    ],
    outcomes: [
      'A reusable Rust foundation for durable vector, block, spatial, temporal, and causal data structures.',
      'Content-free receipts and deterministic replay paths for bounded episode-store work.',
      'A clear migration path from structural substrate toward evidence-aware episodic memory.',
    ],
    evidence: [
      { label: 'Durability gate', detail: 'The workspace gate covers formatting, strict lint, and workspace tests.' },
      { label: 'History', detail: 'The extraction preserved commits touching the substrate crates rather than squashing their origin.' },
      { label: 'Honest status', detail: 'The repository documents implemented structural work and the evidence-layer gaps that remain.' },
    ],
    architecture: [
      { label: 'Episode', detail: 'Context · outcome · constraints' },
      { label: 'Commitment', detail: 'Identity · parents · policy' },
      { label: 'Storage', detail: 'MVCC · WAL · segments' },
      { label: 'Retrieval', detail: 'Semantic · temporal · causal' },
    ],
    status:
      'Active public substrate. Structural capabilities are implemented; complete constitutional episode and evidence-weighted retrieval semantics remain explicitly incomplete.',
    serviceSlug: 'ai-systems-architecture',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/wdbx', kind: 'repository' },
    ],
  },
  {
    slug: 'gama',
    name: 'Gama',
    kind: 'native-systems',
    kindLabel: 'Developer framework',
    featured: true,
    visibility: 'public',
    thesis: 'One retained Swift render tree across radically different hosts.',
    summary:
      'Gama is a modular declarative UI framework whose state, layout, events, and drawing model can drive terminal, Apple, WebAssembly, C/Android, MLIR, and Embedded Swift integrations.',
    stack: ['Swift', 'WASM', 'Embedded Swift', 'MLIR'],
    accent: 'blue',
    index: '04',
    challenge:
      'Cross-platform UI frameworks often hide platform ownership behind a large universal runtime. Gama explores a smaller core that preserves one declarative model while letting each host own the lifecycle it actually controls.',
    role:
      'Framework architecture, Swift implementation, macro and drawing systems, backend boundaries, compiler-facing output, and cross-platform verification.',
    constraints: [
      'The core avoids Foundation, platform UI, POSIX, Windows SDK, and synchronization dependencies.',
      'Every app declares one explicit primary scene while hosts retain their own lifecycle rules.',
      'Actions, focus, subscriptions, and invalidation are host-owned rather than process-global.',
      'Toolchain and platform claims require distinct verification paths.',
    ],
    approach: [
      'Build views into a retained render tree, then separate layout, cell painting, drawing, and host presentation.',
      'Keep optional macros and platform services outside the minimal core.',
      'Use explicit C, WebAssembly, MLIR, terminal, and Apple host boundaries instead of one opaque adapter.',
    ],
    decisions: [
      'Make the primary scene explicit and deterministic for constrained hosts.',
      'Keep frame actions and invalidation scoped to each host instance.',
      'Treat benchmarks as measurements rather than pass/fail claims.',
    ],
    outcomes: [
      'A common declarative model spanning terminal, graphical, browser, embedded, and compiler-oriented surfaces.',
      'A modular product structure that keeps the core independent from platform frameworks.',
      'Typed scene and window ownership that remains visible at the application boundary.',
    ],
    evidence: [
      { label: 'Architecture', detail: 'The public repository documents the render path from app state through layout and drawing to each host.' },
      { label: 'Boundary checks', detail: 'Project scripts validate core dependency boundaries and platform-specific surfaces separately.' },
      { label: 'Toolchain', detail: 'The repository pins its development toolchain and names where platform SDK verification differs.' },
    ],
    architecture: [
      { label: 'App state', detail: 'Scenes · views · identity' },
      { label: 'Render tree', detail: 'Layout · events · actions' },
      { label: 'Draw model', detail: 'Cells · painter · draw list' },
      { label: 'Hosts', detail: 'TUI · Apple · WASM · C · MLIR' },
    ],
    status:
      'Active public Swift framework with an explicit pre-release architecture and separate verification paths for its supported hosts.',
    serviceSlug: 'applied-product-engineering',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/gama', kind: 'repository' },
      { label: 'Documentation', href: 'https://donaldfilimon.github.io/gama/', kind: 'documentation' },
    ],
  },
  {
    slug: 'string',
    name: 'String',
    kind: 'native-systems',
    kindLabel: 'Native product',
    featured: true,
    visibility: 'private',
    thesis: 'A native code editor whose files, windows, and platform behaviors remain honest.',
    summary:
      'String is a private SwiftUI and TextKit 2 editor for macOS and iPadOS, designed around authoritative source files, window-scoped presentation, safe persistence, and native platform ownership.',
    stack: ['SwiftUI', 'TextKit 2', 'SwiftData', 'LSP'],
    accent: 'violet',
    index: '05',
    challenge:
      'A serious native editor must coordinate source-of-truth files, multiple windows, shared buffers, language services, persistence, external changes, and asynchronous UI work without losing user edits or inventing a second source model.',
    role:
      'Product architecture, Swift implementation, editor state model, persistence boundaries, language-service integration, and platform-specific interaction design.',
    constraints: [
      'Source files remain authoritative; the metadata store never owns document contents.',
      'Multiple windows may share one canonical buffer while retaining independent selections and scroll state.',
      'Save, restore, rename, workspace replacement, and external file events must reject stale asynchronous results.',
      'macOS and iPadOS use native text systems and native document workflows.',
    ],
    approach: [
      'Separate shared document buffers from each window’s presentation state.',
      'Keep file and workspace services actor-isolated while projecting Sendable snapshots into UI state.',
      'Treat persistence, language services, native text hosting, and application lifecycle as distinct systems with explicit handoffs.',
    ],
    decisions: [
      'Store workspace and presentation metadata, never source text or credentials, in SwiftData.',
      'Use revision and generation checks to prevent stale work from publishing into a newer editor state.',
      'Keep generated on-device text as an editable preview until an explicit, undoable apply action.',
    ],
    outcomes: [
      'A native multiwindow editor architecture with shared file identity and window-local interaction state.',
      'Encoding, line-ending, external-change, conflict, and unsaved-work protections built into the document model.',
      'A bounded plugin model that invokes external tools without dynamic code loading or shell interpolation.',
    ],
    evidence: [
      { label: 'Private source', detail: 'The implementation and verification remain in a private repository.' },
      { label: 'Architecture record', detail: 'The project documents ownership for buffers, windows, persistence, language services, and native text hosts.' },
      { label: 'Safety model', detail: 'Document mutations and asynchronous results are revision- or generation-checked before publication.' },
    ],
    architecture: [
      { label: 'Workspace', detail: 'Files · identity · watchers' },
      { label: 'Buffer', detail: 'Text · revision · conflicts' },
      { label: 'Window', detail: 'Tabs · selection · scroll' },
      { label: 'Services', detail: 'LSP · metadata · platform UI' },
    ],
    status:
      'Active private engineering project. This case study describes its architecture without exposing source, credentials, or unpublished repository details.',
    serviceSlug: 'applied-product-engineering',
    links: [],
  },
  {
    slug: 'mixed',
    name: 'Mixed',
    shortName: 'AURORA-6',
    kind: 'native-systems',
    kindLabel: 'Immersive system',
    featured: true,
    visibility: 'private',
    thesis: 'An immersive manufacturing facility where simulation and operator authority stay separate.',
    summary:
      'Mixed is a private visionOS and RealityKit project for the AURORA-6 manufacturing facility, combining a deterministic facility model, immersive presentation, and explicit boundaries around advisory AI.',
    stack: ['visionOS', 'RealityKit', 'Swift', 'RCP'],
    accent: 'orange',
    index: '06',
    challenge:
      'An immersive industrial interface must coordinate spatial content, simulation state, controls, and safety-sensitive authority without allowing visual polish or advisory intelligence to imply real-world control.',
    role:
      'Immersive product architecture, Swift and RealityKit implementation, component-package integration, facility state modeling, and acceptance-boundary design.',
    constraints: [
      'AI guidance remains advisory and outside motion, safety, or disposition control.',
      'Facility behavior must be deterministic enough to inspect and reproduce.',
      'Reality Composer Pro source and exported artifacts are separate acceptance layers.',
      'Simulator and unsigned build evidence cannot substitute for device or live operational proof.',
    ],
    approach: [
      'Model the manufacturing cycle independently from the immersive views that present it.',
      'Keep custom RealityKit components in an in-repository package with explicit integration boundaries.',
      'Represent operator controls, facility state, spatial content, and advisory surfaces as separate concerns.',
    ],
    decisions: [
      'Use deterministic cycle behavior for repeatable development and review.',
      'Keep machine-control authority out of the AI layer.',
      'Track source, package build, editor export, simulator behavior, and device acceptance as distinct proofs.',
    ],
    outcomes: [
      'A reproducible immersive facility foundation with a deterministic operational model.',
      'An additive component-package architecture for custom RealityKit behavior.',
      'A safety boundary that prevents advisory interfaces from becoming control authority.',
    ],
    evidence: [
      { label: 'Private source', detail: 'The application and facility implementation remain in a private repository.' },
      { label: 'Build layers', detail: 'Package, application, Reality Composer Pro, simulator, and device results are tracked separately.' },
      { label: 'Authority boundary', detail: 'The project keeps AI advisory behavior outside safety and machine-control decisions.' },
    ],
    architecture: [
      { label: 'Facility model', detail: 'Deterministic cycle · state' },
      { label: 'RealityKit', detail: 'Entities · components · systems' },
      { label: 'Immersive UI', detail: 'Controls · status · guidance' },
      { label: 'Operator', detail: 'Explicit authority boundary' },
    ],
    status:
      'Active private immersive project. The case study intentionally separates implemented source and build evidence from editor export, simulator, and device acceptance.',
    serviceSlug: 'applied-product-engineering',
    links: [],
  },
  {
    slug: 'hydrocycle',
    name: 'HydroCycle',
    kind: 'lab',
    kindLabel: 'Scientific product',
    featured: true,
    visibility: 'public',
    thesis: 'A falsifiable workspace for a difficult energy claim—not a simulation that assumes success.',
    summary:
      'HydroCycle evaluates hydrogen carried in micro- or nanobubble water through measurement, retention, feasibility, and bounded zero-dimensional cycle evidence.',
    stack: ['React', 'FastAPI', 'Cantera', 'Expo'],
    accent: 'blue',
    index: '07',
    challenge:
      'A speculative engineering concept needed a product that could preserve curiosity while refusing to hide the mass-and-energy gap, overstate model fidelity, or treat water as chemical fuel.',
    role:
      'Scientific product architecture, web and mobile engineering, service modeling, generated contracts, provenance design, and claims hardening.',
    constraints: [
      'Hydrogen is the fuel; water contributes no chemical energy.',
      'A failed feasibility gate must return a motored baseline rather than fabricate a reactive trace.',
      'Measurements, assumptions, literature, and generated model outputs require separate provenance.',
      'The local service remains loopback-only with no account, telemetry, cloud-sync, or hardware-control surface.',
    ],
    approach: [
      'Connect measurements to loading and retention, then apply a mass-and-energy gate before the bounded cycle model.',
      'Share generated contracts and presentation models across web and mobile clients.',
      'Make uncertainty, comparison, calibration, and reproducible export part of the product rather than afterthoughts.',
    ],
    decisions: [
      'Represent infeasibility as a valid result with sensitivities and a null reactive trace.',
      'Keep the model homogeneous and zero-dimensional instead of implying spatial or CFD fidelity.',
      'Keep source imports bounded and application-owned while preserving external originals.',
    ],
    outcomes: [
      'A coherent Summary, Workbench, and Test Runs workflow over one evidence model.',
      'A local scientific service with web and simulator-oriented mobile clients.',
      'A product narrative that distinguishes a research model from feasibility proof, safety case, or control system.',
    ],
    evidence: [
      { label: 'Governing flow', detail: 'The public project defines measurement, retention, feasibility, cycle, and export as an ordered model.' },
      { label: 'Trust boundary', detail: 'The backend, web development server, and mobile development path remain host-loopback oriented.' },
      { label: 'Scientific scope', detail: 'The project explicitly names the fidelity and acceptance claims it does not make.' },
    ],
    architecture: [
      { label: 'Measurements', detail: 'Loading · decay · calibration' },
      { label: 'Feasibility', detail: 'Mass · energy · uncertainty' },
      { label: 'Cycle', detail: 'Bounded 0D comparison' },
      { label: 'Experience', detail: 'Web · mobile · exports' },
    ],
    status:
      'Active public research workspace. It is a bounded evaluation environment, not proof of hardware feasibility, safety, certification, or control readiness.',
    serviceSlug: 'evidence-led-hardening',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/HydroCycle', kind: 'repository' },
      { label: 'Documentation', href: 'https://donaldfilimon.github.io/HydroCycle/', kind: 'documentation' },
    ],
  },
  {
    slug: 'cell-state-adaptive',
    name: 'Cell-State Adaptive Problem Solver',
    shortName: 'Cell-State Adaptive',
    kind: 'lab',
    kindLabel: 'WebGPU lab',
    featured: true,
    visibility: 'public',
    thesis: 'A visual laboratory for closed-loop adaptation under uncertainty and constraint.',
    summary:
      'An interactive React and WebGPU laboratory that presents biologically inspired, cell-state adaptation through selectable modules and bounded problem-class simulations.',
    stack: ['React', 'TypeScript', 'WebGPU', 'Bun'],
    accent: 'acid',
    index: '08',
    challenge:
      'A broad adaptive-solver concept needed an experience that made its architecture explorable without claiming universal problem solving or turning decorative animation into scientific evidence.',
    role:
      'Experience architecture, React implementation, WebGPU simulation, fallback design, scientific positioning, and production hardening.',
    constraints: [
      'The system cannot imply that every mathematically definable problem is solvable.',
      'Displayed metrics must derive from solver state rather than independent random animation.',
      'The experience needs an explicit CPU fallback when WebGPU is unavailable.',
      'Motion and navigation must remain usable on mobile and with reduced-motion preferences.',
    ],
    approach: [
      'Expose architecture modules through a live inspector and animated signal routing.',
      'Use closed-loop simulations for bounded problem classes instead of one universal demonstration.',
      'Derive lab metrics from the running solver and keep compute fallback behavior visible.',
    ],
    decisions: [
      'Use WebGPU compute when available and a stated CPU path otherwise.',
      'Keep the original laboratory free of UI-framework dependencies.',
      'Position the work around practical adaptation under limits, uncertainty, optimization, and safety.',
    ],
    outcomes: [
      'An explorable architecture with selectable modules, live routing, and state-derived feedback.',
      'Multiple bounded simulation modes for navigation, filtering, optimization, planning, and partial observability.',
      'A production build with recorded type, test, asset, fallback, and path-safety checks.',
    ],
    evidence: [
      { label: 'Validation record', detail: 'The public project records locked-install, type, test, build, asset, fallback, and path-traversal checks.' },
      { label: 'Compute boundary', detail: 'WebGPU and CPU execution paths are named explicitly.' },
      { label: 'Scientific positioning', detail: 'The experience rejects universal-solver claims in favor of bounded problem classes.' },
    ],
    architecture: [
      { label: 'Signal', detail: 'Observation · uncertainty' },
      { label: 'Cell state', detail: 'Memory · adaptation' },
      { label: 'Policy', detail: 'Candidate · action · feedback' },
      { label: 'Lab', detail: 'WebGPU · CPU fallback' },
    ],
    status:
      'Public interactive laboratory with explicit scientific limits and a documented production verification record.',
    serviceSlug: 'evidence-led-hardening',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/cell-state-adaptive-bun-validated', kind: 'repository' },
    ],
  },
];

const additionalProjects: ProjectSummary[] = [
  {
    slug: 'coreai-assistant',
    name: 'CoreAI Assistant',
    kind: 'native-systems',
    kindLabel: 'Native system',
    featured: false,
    visibility: 'private',
    thesis: 'On-device assistance for a native development workflow.',
    summary:
      'A private macOS coding assistant built with SwiftUI and Apple Foundation Models, with local-first product and data boundaries.',
    stack: ['SwiftUI', 'Foundation Models'],
    accent: 'blue',
    links: [],
  },
  {
    slug: 'mlai',
    name: 'MLAI',
    kind: 'product',
    kindLabel: 'Product platform',
    featured: false,
    visibility: 'public',
    thesis: 'A privacy-first product line centered on Apple Silicon.',
    summary:
      'A published Bun, Next.js, and Expo monorepo for privacy-oriented product experiences.',
    stack: ['Bun', 'Next.js', 'Expo'],
    accent: 'violet',
    links: [
      { label: 'Repository', href: 'https://github.com/donaldfilimon/MLAI-CORPORATION-WWW', kind: 'repository' },
    ],
  },
  {
    slug: 'custom-perfections',
    name: 'Custom Perfections',
    kind: 'product',
    kindLabel: 'Commerce product',
    featured: false,
    visibility: 'private',
    thesis: 'A private commerce system for custom printing and personalized goods.',
    summary:
      'A TypeScript and Stripe product whose public presence remains intentionally limited ahead of launch.',
    stack: ['TypeScript', 'Stripe'],
    accent: 'orange',
    links: [],
  },
  {
    slug: 'nabu',
    name: 'nabu',
    kind: 'product',
    kindLabel: 'Product system',
    featured: false,
    visibility: 'public',
    thesis: 'A marketing and advertising architecture on SvelteKit and D1.',
    summary:
      'A public product system whose canonical repository is maintained by AmmouraMe.',
    stack: ['SvelteKit', 'Cloudflare D1'],
    accent: 'acid',
    links: [
      { label: 'Repository', href: 'https://github.com/AmmouraMe/nabu', kind: 'repository' },
    ],
  },
  {
    slug: 'minecraft-server-open',
    name: 'minecraft-server-open',
    kind: 'lab',
    kindLabel: 'Protocol lab',
    featured: false,
    visibility: 'private',
    thesis: 'A Rust protocol server and client environment for agent-oriented game research.',
    summary:
      'A private Minecraft Java protocol server paired with a client surface for a game-playing agent.',
    stack: ['Rust', 'Game protocol'],
    accent: 'blue',
    links: [],
  },
];

export const projects: ProjectSummary[] = [...caseStudies, ...additionalProjects];

export const kindLabels: Record<ProjectKind, string> = {
  'ai-systems': 'AI Systems',
  'native-systems': 'Native Systems',
  product: 'Products',
  lab: 'Research Labs',
};

export const processSteps = [
  {
    number: '01',
    title: 'Frame',
    body: 'Name the user, system boundary, authority model, hard constraints, and claim that must become true.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'Create the smallest coherent architecture and product slice that exercises the difficult part early.',
  },
  {
    number: '03',
    title: 'Prove',
    body: 'Attach tests, artifacts, source evidence, deployment state, and live acceptance to the exact claims they support.',
  },
  {
    number: '04',
    title: 'Transfer',
    body: 'Leave a system whose boundaries, operating model, and remaining risks are legible to the next person.',
  },
] as const;

export const navigation = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getService(slug: ServiceOffering['slug']) {
  return services.find((service) => service.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: caseStudies[(index - 1 + caseStudies.length) % caseStudies.length],
    next: caseStudies[(index + 1) % caseStudies.length],
  };
}
