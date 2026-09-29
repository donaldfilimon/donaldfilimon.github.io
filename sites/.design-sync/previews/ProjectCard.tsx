import { ProjectCard } from "sites-project";

/**
 * Records are lifted verbatim from content/site.ts (the typed ProjectSummary
 * source the app itself renders), not invented — this component states
 * visibility and public/private links, so fabricated entries would misrepresent
 * real engagements in every design the agent builds with it.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 620,
};

const mlai = {
  slug: "mlai",
  name: "MLAI",
  kind: "product" as const,
  kindLabel: "Product platform",
  featured: false,
  visibility: "public" as const,
  thesis: "A privacy-first product line centered on Apple Silicon.",
  summary:
    "A published Bun, Next.js, and Expo monorepo for privacy-oriented product experiences.",
  stack: ["Bun", "Next.js", "Expo"],
  accent: "violet" as const,
  links: [
    {
      label: "Repository",
      href: "https://github.com/donaldfilimon/MLAI-CORPORATION-WWW",
      kind: "repository" as const,
    },
  ],
};

const coreai = {
  slug: "coreai-assistant",
  name: "CoreAI Assistant",
  kind: "native-systems" as const,
  kindLabel: "Native system",
  featured: false,
  visibility: "private" as const,
  thesis: "On-device assistance for a native development workflow.",
  summary:
    "A private macOS coding assistant built with SwiftUI and Apple Foundation Models, with local-first product and data boundaries.",
  stack: ["SwiftUI", "Foundation Models"],
  accent: "blue" as const,
  links: [],
};

export const PublicWork = () => (
  <div style={paper}>
    <ProjectCard project={mlai} index={0} />
  </div>
);

export const PrivateWork = () => (
  <div style={paper}>
    <ProjectCard project={coreai} index={1} />
  </div>
);

export const Compact = () => (
  <div style={paper}>
    <div style={{ display: "grid", gap: 16 }}>
      <ProjectCard compact project={mlai} />
      <ProjectCard compact project={coreai} />
    </div>
  </div>
);
