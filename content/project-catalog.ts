import generatedCatalog from "./project-catalog.generated.json";
import { publicationDecisionById, projectPublicationDecisions } from "./project-publication";
import { projects } from "./site";
import type {
  GeneratedProjectRecord,
  ProjectLink,
  PublicProjectRecord,
} from "./project-types";

const generated = generatedCatalog as GeneratedProjectRecord[];
const editorialById = new Map(projects.map((project) => [project.id, project]));

function approvedLinksFor(record: GeneratedProjectRecord): ProjectLink[] {
  const decision = publicationDecisionById.get(record.stableId);
  if (!decision) {
    throw new Error(`missing publication decision: ${record.stableId}`);
  }
  if (!decision.approvedSummaryId) {
    return [];
  }

  const editorial = editorialById.get(decision.approvedSummaryId);
  if (!editorial) {
    throw new Error(
      `${record.stableId}: missing editorial project ${decision.approvedSummaryId}`,
    );
  }

  const links: ProjectLink[] = [];
  if (editorial.href) {
    links.push({ type: "repository", href: editorial.href, label: "Repository" });
  }
  if (editorial.docs) {
    links.push({
      type: "documentation",
      href: editorial.docs,
      label: "Documentation",
    });
  }

  for (const link of links) {
    if (!decision.approvedLinks.includes(link.href)) {
      throw new Error(`${record.stableId}: unapproved public link ${link.href}`);
    }
  }
  if (links.length !== decision.approvedLinks.length) {
    throw new Error(`${record.stableId}: approved link is missing from editorial content`);
  }
  return links;
}

export const projectCatalog: PublicProjectRecord[] = generated.map((record) => {
  const decision = publicationDecisionById.get(record.stableId);
  const editorial = decision?.approvedSummaryId
    ? editorialById.get(decision.approvedSummaryId)
    : undefined;

  return {
    ...record,
    featured: record.publicationClass === "featured",
    ...(editorial ? { summary: editorial.summary } : {}),
    links: approvedLinksFor(record),
  };
});

export function assertProjectCatalog() {
  const decisionIds = new Set(projectPublicationDecisions.map((item) => item.stableId));
  const catalogIds = new Set<string>();

  if (projectCatalog.length !== projectPublicationDecisions.length) {
    throw new Error("publication manifest and generated catalog counts differ");
  }

  for (const project of projectCatalog) {
    if (catalogIds.has(project.stableId)) {
      throw new Error(`duplicate public project stable ID: ${project.stableId}`);
    }
    catalogIds.add(project.stableId);
    if (!decisionIds.has(project.stableId)) {
      throw new Error(`catalog project lacks publication decision: ${project.stableId}`);
    }
    if (project.ownership === "external" && project.publicationClass !== "reference") {
      throw new Error(`${project.stableId}: external project must be a reference`);
    }
    if (project.publicationClass === "reference" && project.ownership !== "external") {
      throw new Error(`${project.stableId}: reference project must be external`);
    }
  }

  const featured = projectCatalog.filter((project) => project.featured);
  if (featured.length !== 8) {
    throw new Error(`expected 8 featured projects, found ${featured.length}`);
  }

  return true;
}

assertProjectCatalog();

export const projectCatalogCounts = projectCatalog.reduce(
  (counts, project) => {
    counts.total += 1;
    counts[project.lifecycle] += 1;
    return counts;
  },
  {
    total: 0,
    active: 0,
    experimental: 0,
    archived: 0,
    retired: 0,
    external: 0,
  },
);
