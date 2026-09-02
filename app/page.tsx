import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PersonalizedWork } from "@/components/site/personalized-work";
import { ProjectAtlas } from "@/components/site/project-atlas";
import { projectCatalog, projectCatalogCounts } from "@/content/project-catalog";
import {
  credibility,
  links,
  practice,
  projects,
  services,
  site,
  type Project,
} from "@/content/site";

const featuredProjects = projects.filter((project) => project.featured);

function ProjectLinks({ project }: { project: Project }) {
  const repo = project.public ? project.href : undefined;
  return (
    <>
      {repo ? (
        <a className="text-sm underline-offset-4 hover:underline" href={repo}>
          Repository
        </a>
      ) : (
          <span className="text-sm text-muted-foreground">Private work</span>
      )}
      {project.docs ? (
        <>
          <span aria-hidden="true"> · </span>
          <a className="text-sm underline-offset-4 hover:underline" href={project.docs}>
            Documentation
          </a>
        </>
      ) : null}
    </>
  );
}

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          NAME
        </p>
        <h1 className="font-heading mt-3 text-[clamp(3rem,12vw,8rem)] leading-[0.86] font-extrabold tracking-tight">
          {site.name}
        </h1>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          {site.fullName} · {site.role} · {site.location}
        </p>

        <dl className="spec mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-[8rem_1fr]">
          <dt>Synopsis</dt>
          <dd className="max-w-2xl text-lg text-pretty">{site.lede}</dd>
          <dt>Stack</dt>
          <dd className="flex flex-wrap gap-2">
            {site.stack.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </dd>
          <dt>Org</dt>
          <dd>
            {site.company}
            <span className="text-muted-foreground"> · XFOSS</span>
          </dd>
          <dt>Availability</dt>
          <dd>{site.availability}</dd>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#work">Explore the work</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${site.email}`}>Start a conversation</a>
          </Button>
        </div>
      </section>

      <section aria-label="Systems domains" className="border-y">
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
          {credibility.map((item, index) => (
            <li key={item} className="flex min-h-20 items-center gap-3 px-4 font-mono text-xs tracking-[0.08em] uppercase sm:px-6">
              <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="work"
        aria-labelledby="work-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          WORK
        </p>
        <h2 id="work-title" className="font-heading mt-2 text-4xl font-extrabold tracking-tight">
          Featured Systems
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Eight systems that show how architecture, implementation, validation,
          and delivery connect. Public links are limited to repositories and
          documentation verified on GitHub.
        </p>
        <div className="featured-work-grid mt-8">
          {featuredProjects.map((project, index) => (
            <article className="featured-work-card flex flex-col justify-between" key={project.id}>
              <div>
                <div className="flex items-center justify-between gap-4 font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.kind}</span>
                </div>
                <h3 className="font-heading mt-10 text-3xl font-extrabold tracking-tight" translate="no">
                  {project.name}
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground">{project.summary}</p>
              </div>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t pt-4">
                <span className="font-mono text-xs text-muted-foreground" translate="no">
                  {project.stack}
                </span>
                <span><ProjectLinks project={project} /></span>
              </div>
            </article>
          ))}
        </div>

      </section>

      <PersonalizedWork projects={projectCatalog} />

      <section
        id="atlas"
        aria-labelledby="atlas-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          PROJECT ATLAS
        </p>
        <h2 id="atlas-title" className="font-heading mt-2 text-4xl font-extrabold tracking-tight">
          The reviewed engineering record
        </h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {projectCatalogCounts.total} privacy-bounded project identities from the
          local reviewed registry: {projectCatalogCounts.active} active, {" "}
          {projectCatalogCounts.experimental} experimental, {" "}
          {projectCatalogCounts.archived} archived, {" "}
          {projectCatalogCounts.retired} retired, and {" "}
          {projectCatalogCounts.external} external. Only approved high-level metadata
          and verified public links are published. Local paths, repository state, source,
          and operational findings stay private.
        </p>
        <div className="mt-8">
          <ProjectAtlas projects={projectCatalog} />
        </div>
      </section>

      <section
        id="services"
        aria-labelledby="services-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          SERVICES
        </p>
        <h2 id="services-title" className="font-heading mt-2 text-4xl font-extrabold tracking-tight">
          Senior Depth, Close to the Product
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Best fit for founders, engineering leaders, and product leaders working
          through a technically difficult system rather than buying a commodity deliverable.
        </p>
        <div className="service-grid mt-8">
          {services.map((service) => (
            <article className="service-card" id={service.id} key={service.id}>
              <span className="font-mono text-xs text-primary">{service.number}</span>
              <h3 className="font-heading mt-8 text-2xl font-extrabold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{service.summary}</p>
              <ul className="mt-8 space-y-2 border-t pt-4 text-sm">
                {service.outputs.map((output) => (
                  <li key={output} className="flex gap-3">
                    <span aria-hidden="true" className="text-primary">+</span>
                    {output}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="practice"
        aria-labelledby="practice-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          PRACTICE
        </p>
        <h2
          id="practice-title"
          className="font-heading mt-2 text-4xl font-extrabold tracking-tight"
        >
          How
        </h2>
        <dl className="spec mt-8 grid gap-x-10 gap-y-8 border-y py-8 sm:grid-cols-[8rem_1fr]">
          {practice.map((item) => (
            <div key={item.title} className="contents">
              <dt>{item.title}</dt>
              <dd className="max-w-2xl text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          CONTACT
        </p>
        <h2
          id="contact-title"
          className="font-heading mt-2 text-4xl font-extrabold tracking-tight"
        >
          Open channel
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Share the problem, the people it serves, what already exists, and the
          constraint that makes it difficult. Best reached by email. Public work lives on GitHub.
        </p>
        <ul className="mt-8 divide-y border-y">
          {links.map((link) => (
            <li key={link.href} className="py-3">
              <a
                className="font-mono text-sm underline-offset-4 hover:underline"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
