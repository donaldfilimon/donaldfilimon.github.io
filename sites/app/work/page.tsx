import type { Metadata } from 'next';
import { ArrowDownRight } from 'lucide-react';

import { ContactPanel } from '@/components/contact-panel';
import { parseWorkFilter, WorkFilter } from '@/components/work-filter';
import { caseStudies, projects } from '@/content/site';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Case studies and project work across AI runtimes, provenance, native systems, developer frameworks, and scientific products.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Selected Work — Donald Filimon',
    description:
      'Systems work across AI, native products, developer tools, and scientific software.',
    url: '/work',
  },
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const filter = parseWorkFilter((await searchParams).filter);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero work-page-hero">
        <div className="page-hero-index">01 / Work</div>
        <div>
          <p className="eyebrow">Selected systems and complete register</p>
          <h1>Explore the systems.</h1>
        </div>
        <div className="page-hero-aside">
          <p>
            {caseStudies.length} detailed case studies anchor a broader
            portfolio across AI systems, native products, developer frameworks,
            and applied labs.
          </p>
          <div className="page-stat-row">
            <span>
              <strong>{caseStudies.length}</strong> deep cases
            </span>
            <span>
              <strong>{projects.length}</strong> projects
            </span>
          </div>
        </div>
        <ArrowDownRight className="page-hero-arrow" aria-hidden="true" />
      </section>

      <section
        className="section work-register-section"
        id="work-register"
        aria-labelledby="register-title"
      >
        <div className="register-heading">
          <p className="eyebrow">The register</p>
          <h2 id="register-title">Find your area of interest.</h2>
          <p>
            Private work is described without source links or sensitive
            implementation details. Public work links to its current source.
          </p>
        </div>
        <WorkFilter filter={filter} />
      </section>

      <ContactPanel compact />
    </main>
  );
}
