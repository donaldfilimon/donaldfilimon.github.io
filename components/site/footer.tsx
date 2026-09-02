import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground sm:px-6">
        <p>
          {site.fullName} · {site.location}
        </p>
        <p>
          <a className="underline-offset-4 hover:text-foreground hover:underline" href={site.url}>
            donaldfilimon.github.io
          </a>
          <span aria-hidden="true"> · </span>
          <a
            className="underline-offset-4 hover:text-foreground hover:underline"
            href={site.domain}
          >
            donaldfilimon.com
          </a>
        </p>
      </div>
    </footer>
  );
}
