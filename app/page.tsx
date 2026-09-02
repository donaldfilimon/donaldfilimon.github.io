import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { links, practice, projects, site } from "@/content/site";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {site.role} · {site.location}
        </p>
        <h1 className="font-heading mt-4 max-w-3xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{site.lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#work">See the work</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${site.email}`}>Write to me</a>
          </Button>
        </div>
      </section>

      <Separator />

      <section
        id="work"
        aria-labelledby="work-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          From this machine
        </p>
        <h2 id="work-title" className="font-heading mt-2 text-3xl font-semibold tracking-tight">
          Work
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Public systems I am actively building. Copy is taken from the
          checkouts on disk, not from a résumé.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} id={`work-${project.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-heading text-xl">{project.name}</CardTitle>
                  <Badge variant="outline">{project.stack}</Badge>
                </div>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-4">
                {project.href ? (
                  <a
                    className="text-sm underline-offset-4 hover:underline"
                    href={project.href}
                  >
                    Repository
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Private checkout</span>
                )}
                {project.docs ? (
                  <a
                    className="text-sm underline-offset-4 hover:underline"
                    href={project.docs}
                  >
                    Docs
                  </a>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section
        id="practice"
        aria-labelledby="practice-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          How the work is done
        </p>
        <h2
          id="practice-title"
          className="font-heading mt-2 text-3xl font-semibold tracking-tight"
        >
          Practice
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {practice.map((item) => (
            <Card key={item.title} size="sm">
              <CardHeader>
                <CardTitle className="font-heading">{item.title}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Open channel
        </p>
        <h2
          id="contact-title"
          className="font-heading mt-2 text-3xl font-semibold tracking-tight"
        >
          Contact
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Best reached by email. Public work lives on GitHub.
        </p>
        <ul className="mt-8 divide-y">
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
