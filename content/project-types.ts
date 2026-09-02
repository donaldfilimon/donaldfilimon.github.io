export type ProjectLifecycle =
  | "active"
  | "experimental"
  | "archived"
  | "retired"
  | "external";

export type ProjectOwnership = "personal" | "company" | "external";

export type RegistryProjectKind = "primary" | "exceptional" | "reference";

export type PublicationClass =
  | "featured"
  | "active"
  | "experiment"
  | "archive"
  | "recovery"
  | "reference";

export type ProjectLinkType = "repository" | "documentation" | "product";

export type ProjectLink = {
  type: ProjectLinkType;
  href: string;
  label: string;
};

export type GeneratedProjectRecord = {
  stableId: string;
  displayName: string;
  lifecycle: ProjectLifecycle;
  ownership: ProjectOwnership;
  projectKind: RegistryProjectKind;
  ecosystems: string[];
  publicationClass: PublicationClass;
  primaryStableId?: string;
};

export type PublicProjectRecord = GeneratedProjectRecord & {
  featured: boolean;
  summary?: string;
  links: ProjectLink[];
};

export type ProjectPublicationDecision = {
  stableId: string;
  publish: true;
  publicationClass: PublicationClass;
  primaryStableId?: string;
  approvedSummaryId?: string;
  approvedLinks: string[];
};
