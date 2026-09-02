import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { links, practice, projects, site, type Project } from "@/content/site";

function ProjectLinks({ project }: { project: Project }) {
  const repo = project.public ? project.href : undefined;
  return (
    <>
      {repo ? (
        <a className="text-sm underline-offset-4 hover:underline" href={repo}>
          repo
        </a>
      ) : (
        <span className="text-sm text-muted-foreground">private</span>
      )}
      {project.docs ? (
        <>
          <span aria-hidden="true"> · </span>
          <a className="text-sm underline-offset-4 hover:underline" href={project.docs}>
            docs
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
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#work">Read the work</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${site.email}`}>Write to me</a>
          </Button>
        </div>
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
          Register
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Systems I am building from this machine. Copy matches the checkouts,
          not a résumé.
        </p>
        <ul className="mt-8 divide-y border-y md:hidden">
          {projects.map((project) => (
            <li key={project.id} id={`work-${project.id}`} className="py-5">
              <p className="font-heading text-lg font-semibold">{project.name}</p>
              <p className="mt-1 font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                {project.kind} · {project.stack}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
              <p className="mt-3">
                <ProjectLinks project={project} />
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 hidden border-y md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  Name
                </TableHead>
                <TableHead className="font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  Kind
                </TableHead>
                <TableHead className="font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  Stack
                </TableHead>
                <TableHead className="font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  Notes
                </TableHead>
                <TableHead className="font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  Links
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-heading text-base font-semibold whitespace-nowrap">
                    {project.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs uppercase">
                    {project.kind}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{project.stack}</TableCell>
                  <TableCell className="max-w-md whitespace-normal text-muted-foreground">
                    {project.summary}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <ProjectLinks project={project} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
          Best reached by email. Public work lives on GitHub.
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
