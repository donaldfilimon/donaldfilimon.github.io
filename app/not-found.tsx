import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Missing
      </p>
      <h1 className="font-heading mt-4 text-6xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That path is not on this site.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </section>
  );
}
