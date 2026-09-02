"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  ProjectLifecycle,
  ProjectOwnership,
  PublicationClass,
  PublicProjectRecord,
} from "@/content/project-types";
import { dispatchPortfolioSignal } from "@/lib/project-personalization";

type FilterValue<T extends string> = T | "all";

const groups: Array<{
  id: string;
  title: string;
  description: string;
  classes: PublicationClass[];
  open: boolean;
}> = [
  {
    id: "active",
    title: "Active work",
    description: "Current systems, products, infrastructure, and platform work.",
    classes: ["featured", "active"],
    open: true,
  },
  {
    id: "experiments",
    title: "Experiments",
    description: "Exploratory implementations with an intentionally narrower claim boundary.",
    classes: ["experiment"],
    open: true,
  },
  {
    id: "archive",
    title: "Archived and retired work",
    description: "Historical projects retained as part of the engineering record.",
    classes: ["archive"],
    open: false,
  },
  {
    id: "recovery",
    title: "Recovery and historical variants",
    description: "Snapshots, recovered variants, and superseded implementations related to primary projects.",
    classes: ["recovery"],
    open: false,
  },
  {
    id: "references",
    title: "External references",
    description: "Reviewed reference repositories. These are not presented as Donald-authored work.",
    classes: ["reference"],
    open: false,
  },
];

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function label(value: string) {
  return value.replaceAll("-", " ");
}

export function filterProjectCatalog(
  projects: PublicProjectRecord[],
  filters: {
    query: string;
    lifecycle: FilterValue<ProjectLifecycle>;
    ownership: FilterValue<ProjectOwnership>;
    publicationClass: FilterValue<PublicationClass>;
    ecosystem: string;
  },
) {
  const query = filters.query.trim().toLowerCase();
  return projects.filter((project) => {
    const searchable = [project.displayName, ...project.ecosystems]
      .join(" ")
      .toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (filters.lifecycle === "all" || project.lifecycle === filters.lifecycle) &&
      (filters.ownership === "all" || project.ownership === filters.ownership) &&
      (filters.publicationClass === "all" ||
        project.publicationClass === filters.publicationClass) &&
      (filters.ecosystem === "all" ||
        project.ecosystems.includes(filters.ecosystem))
    );
  });
}

function ProjectEntry({
  project,
  parentName,
}: {
  project: PublicProjectRecord;
  parentName?: string;
}) {
  const privateLabel =
    project.publicationClass === "reference"
      ? "Reference metadata only"
      : project.publicationClass === "archive" ||
          project.publicationClass === "recovery"
        ? "Historical metadata only"
        : "Private/local metadata";

  return (
    <article className="atlas-card" data-project-id={project.stableId}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="font-heading text-xl font-bold tracking-tight" translate="no">
            {project.displayName}
          </h4>
          {parentName ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Historical variant of <span translate="no">{parentName}</span>
            </p>
          ) : null}
          {project.ownership === "external" ? (
            <p className="mt-1 text-xs text-muted-foreground">
              External reference, not presented as Donald-authored work.
            </p>
          ) : null}
        </div>
        <Badge variant={project.featured ? "default" : "outline"}>
          {label(project.publicationClass)}
        </Badge>
      </div>

      {project.summary ? (
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {project.summary}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.displayName} metadata`}>
        <Badge variant="secondary">{label(project.lifecycle)}</Badge>
        <Badge variant="outline">{label(project.ownership)}</Badge>
        <Badge variant="outline">{label(project.projectKind)}</Badge>
        {project.ecosystems.map((ecosystem) => (
          <Badge key={ecosystem} variant="outline">
            {ecosystem}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex min-h-11 flex-wrap items-center gap-x-3 gap-y-2 border-t pt-3 text-sm">
        {project.links.length > 0 ? (
          project.links.map((link) => (
            <a
              className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline"
              href={link.href}
              key={link.href}
              onClick={() =>
                dispatchPortfolioSignal({ stableIds: [project.stableId], weight: 0.5 })
              }
            >
              {link.label}
            </a>
          ))
        ) : (
          <span className="text-muted-foreground">{privateLabel}</span>
        )}
      </div>
    </article>
  );
}

export function ProjectAtlas({ projects }: { projects: PublicProjectRecord[] }) {
  const [query, setQuery] = useState("");
  const [lifecycle, setLifecycle] =
    useState<FilterValue<ProjectLifecycle>>("all");
  const [ownership, setOwnership] =
    useState<FilterValue<ProjectOwnership>>("all");
  const [publicationClass, setPublicationClass] =
    useState<FilterValue<PublicationClass>>("all");
  const [ecosystem, setEcosystem] = useState("all");

  const ecosystems = useMemo(
    () => uniqueSorted(projects.flatMap((project) => project.ecosystems)),
    [projects],
  );
  const filtered = useMemo(
    () =>
      filterProjectCatalog(projects, {
        query,
        lifecycle,
        ownership,
        publicationClass,
        ecosystem,
      }),
    [ecosystem, lifecycle, ownership, projects, publicationClass, query],
  );
  const names = useMemo(
    () => new Map(projects.map((project) => [project.stableId, project.displayName])),
    [projects],
  );
  const isFiltering =
    Boolean(query.trim()) ||
    lifecycle !== "all" ||
    ownership !== "all" ||
    publicationClass !== "all" ||
    ecosystem !== "all";

  function emitFilterSignal(predicate: (project: PublicProjectRecord) => boolean) {
    dispatchPortfolioSignal({
      stableIds: projects.filter(predicate).map((project) => project.stableId),
      weight: 0.25,
    });
  }

  function reset() {
    setQuery("");
    setLifecycle("all");
    setOwnership("all");
    setPublicationClass("all");
    setEcosystem("all");
  }

  return (
    <div>
      <div className="atlas-controls border-y py-6">
        <label className="atlas-field atlas-search">
          <span>Search projects</span>
          <input
            className="atlas-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or ecosystem"
            type="search"
            value={query}
          />
        </label>
        <label className="atlas-field">
          <span>Lifecycle</span>
          <select
            className="atlas-input"
            onChange={(event) => {
              const next = event.target.value as FilterValue<ProjectLifecycle>;
              setLifecycle(next);
              if (next !== "all") emitFilterSignal((project) => project.lifecycle === next);
            }}
            value={lifecycle}
          >
            <option value="all">All lifecycles</option>
            <option value="active">Active</option>
            <option value="experimental">Experimental</option>
            <option value="archived">Archived</option>
            <option value="retired">Retired</option>
            <option value="external">External</option>
          </select>
        </label>
        <label className="atlas-field">
          <span>Ecosystem</span>
          <select
            className="atlas-input"
            onChange={(event) => {
              const next = event.target.value;
              setEcosystem(next);
              if (next !== "all") {
                emitFilterSignal((project) => project.ecosystems.includes(next));
              }
            }}
            value={ecosystem}
          >
            <option value="all">All ecosystems</option>
            {ecosystems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="atlas-field">
          <span>Ownership</span>
          <select
            className="atlas-input"
            onChange={(event) => {
              const next = event.target.value as FilterValue<ProjectOwnership>;
              setOwnership(next);
              if (next !== "all") emitFilterSignal((project) => project.ownership === next);
            }}
            value={ownership}
          >
            <option value="all">All ownership</option>
            <option value="personal">Personal</option>
            <option value="company">Company</option>
            <option value="external">External reference</option>
          </select>
        </label>
        <label className="atlas-field">
          <span>Record class</span>
          <select
            className="atlas-input"
            onChange={(event) => {
              const next = event.target.value as FilterValue<PublicationClass>;
              setPublicationClass(next);
              if (next !== "all") {
                emitFilterSignal((project) => project.publicationClass === next);
              }
            }}
            value={publicationClass}
          >
            <option value="all">All classes</option>
            <option value="featured">Featured</option>
            <option value="active">Active</option>
            <option value="experiment">Experiment</option>
            <option value="archive">Archive</option>
            <option value="recovery">Recovery</option>
            <option value="reference">Reference</option>
          </select>
        </label>
        <Button className="min-h-11 self-end" onClick={reset} type="button" variant="outline">
          Reset atlas
        </Button>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-xs text-muted-foreground">
        Showing {filtered.length} of {projects.length} reviewed project records.
      </p>

      <div className="mt-8 space-y-5">
        {groups.map((group) => {
          const entries = filtered.filter((project) =>
            group.classes.includes(project.publicationClass),
          );
          if (entries.length === 0) return null;
          return (
            <details
              className="atlas-group border"
              key={group.id}
              open={isFiltering || group.open}
            >
              <summary className="atlas-summary min-h-14 cursor-pointer px-5 py-4">
                <span>
                  <strong className="font-heading text-xl">{group.title}</strong>
                  <span className="ml-3 font-mono text-xs text-primary">
                    {entries.length}
                  </span>
                  <span className="mt-1 block max-w-3xl text-sm font-normal text-muted-foreground">
                    {group.description}
                  </span>
                </span>
              </summary>
              <div className="atlas-grid border-t">
                {entries.map((project) => (
                  <ProjectEntry
                    key={project.stableId}
                    parentName={
                      project.primaryStableId
                        ? names.get(project.primaryStableId)
                        : undefined
                    }
                    project={project}
                  />
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 border p-6">
          <p>No project records match these filters.</p>
          <Button className="mt-4 min-h-11" onClick={reset} type="button" variant="outline">
            Show all projects
          </Button>
        </div>
      ) : null}
    </div>
  );
}
