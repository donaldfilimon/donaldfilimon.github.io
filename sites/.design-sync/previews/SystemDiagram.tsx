import { SystemDiagram } from "sites-project";

/**
 * SystemDiagram takes `nodes: ArchitectureNode[]` and an optional `label`,
 * mirroring the real usage at app/work/[slug]/page.tsx:122
 * (`<SystemDiagram nodes={project.architecture} label={\`${project.name} architecture flow\`} />`).
 * Node arrays below are lifted verbatim from the `abi` and `wdbx` entries in
 * content/site.ts's caseStudies (not invented), to show the component with
 * two real, differently-shaped node sets.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

const abiNodes = [
  { label: "Operator", detail: "CLI · TUI · MCP client" },
  { label: "ABI runtime", detail: "Governance · scheduler · tools" },
  { label: "Model layer", detail: "Local and explicit provider paths" },
  { label: "WDBX", detail: "Memory · evidence · provenance" },
];

const wdbxNodes = [
  { label: "Episode", detail: "Context · outcome · constraints" },
  { label: "Commitment", detail: "Identity · parents · policy" },
  { label: "Storage", detail: "MVCC · WAL · segments" },
  { label: "Retrieval", detail: "Semantic · temporal · causal" },
];

export const AbiArchitecture = () => (
  <div style={paper}>
    <SystemDiagram nodes={abiNodes} label="ABI architecture flow" />
  </div>
);

export const WdbxArchitecture = () => (
  <div style={paper}>
    <SystemDiagram nodes={wdbxNodes} label="WDBX architecture flow" />
  </div>
);
