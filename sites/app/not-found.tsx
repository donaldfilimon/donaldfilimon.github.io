import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404 · Outside the system boundary</p>
      <h1>This Route Does Not Exist.</h1>
      <p>
        The work is still here. Return home or continue into the case studies.
      </p>
      <div>
        <Link className="pill-link pill-link-primary" href="/">
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link className="pill-link" href="/work">
          Explore Work <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
