import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
} from 'lucide-react';

import { ContactPanel } from '@/components/contact-panel';
import { SystemDiagram } from '@/components/system-diagram';
import {
  caseStudies,
  getAdjacentCaseStudies,
  getCaseStudy,
  getService,
} from '@/content/site';

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  const title = `${project.name} Case Study`;
  const description = project.thesis;
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} — Donald Filimon`,
      description,
      url: `/work/${project.slug}`,
      images: [],
    },
    twitter: { title: `${title} — Donald Filimon`, description, images: [] },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const service = getService(project.serviceSlug);
  const { previous, next } = getAdjacentCaseStudies(project.slug);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className={`case-hero tone-${project.accent}`}>
        <div className="case-hero-topline">
          <Link href="/work">
            <ArrowLeft aria-hidden="true" size={16} /> All Work
          </Link>
          <span>
            {project.index} / {String(caseStudies.length).padStart(2, '0')}
          </span>
        </div>
        <div className="case-hero-title">
          <p className="eyebrow">{project.kindLabel}</p>
          <h1 translate="no">{project.name}</h1>
          {project.shortName ? (
            <p className="case-short-name">{project.shortName}</p>
          ) : null}
        </div>
        <div className="case-hero-summary">
          <p>{project.thesis}</p>
          <div
            className="case-tags"
            aria-label={`${project.name} technologies`}
          >
            {project.stack.map((item) => (
              <span key={item} translate="no">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="case-hero-privacy">
          {project.visibility === 'private' ? (
            <>
              <LockKeyhole aria-hidden="true" size={17} />
              <span>Private work · narrative intentionally bounded</span>
            </>
          ) : (
            <>
              <CheckCircle2 aria-hidden="true" size={17} />
              <span>Public source available</span>
            </>
          )}
        </div>
      </section>

      <section className="case-intro section">
        <div>
          <p className="eyebrow">The challenge</p>
          <h2>{project.challenge}</h2>
        </div>
        <aside>
          <p className="eyebrow">Role</p>
          <p>{project.role}</p>
          <p className="eyebrow">Current status</p>
          <p>{project.status}</p>
        </aside>
      </section>

      <section className="case-architecture section dark-section">
        <div className="case-section-heading">
          <p className="eyebrow">System shape</p>
          <h2>A Legible Architecture for the Difficult Part.</h2>
        </div>
        <SystemDiagram
          nodes={project.architecture}
          label={`${project.name} architecture flow`}
        />
      </section>

      <section className="case-details section">
        <div className="case-detail-column">
          <p className="eyebrow">Constraints</p>
          <h2>What the System Had to Respect.</h2>
          <ul className="numbered-list">
            {project.constraints.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="case-detail-column">
          <p className="eyebrow">Approach</p>
          <h2>How the Work Was Structured.</h2>
          <ul className="numbered-list">
            {project.approach.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-decisions section">
        <div className="case-section-heading">
          <p className="eyebrow">Engineering decisions</p>
          <h2>Choices That Keep the Architecture Honest.</h2>
        </div>
        <div className="decision-grid">
          {project.decisions.map((decision, index) => (
            <article key={decision}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{decision}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-proof section">
        <div className="case-proof-heading">
          <p className="eyebrow">Outcomes and evidence</p>
          <h2>The Claim and the Proof Stay Next to Each Other.</h2>
          <p>
            These statements describe repository-backed architecture and
            validation. They do not convert local evidence into hosted,
            production, certification, or adoption claims.
          </p>
        </div>
        <div className="outcome-list">
          {project.outcomes.map((outcome) => (
            <p key={outcome}>
              <CheckCircle2 aria-hidden="true" size={18} />
              {outcome}
            </p>
          ))}
        </div>
        <div className="evidence-grid">
          {project.evidence.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-links section">
        <div>
          <p className="eyebrow">Continue</p>
          <h2>{service?.title}</h2>
          <p>{service?.summary}</p>
          <Link className="text-link" href={`/services#${project.serviceSlug}`}>
            See the Service <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="source-links">
          {project.links.length ? (
            project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{link.kind}</span>
                {link.label}
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            ))
          ) : (
            <div className="private-source-note">
              <LockKeyhole aria-hidden="true" size={19} />
              <div>
                <strong>Private source</strong>
                <p>No repository link is exposed for this project.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <nav className="case-pagination" aria-label="Case study navigation">
        {previous ? (
          <Link href={`/work/${previous.slug}`}>
            <ArrowLeft aria-hidden="true" />
            <span>
              <small>Previous case</small>
              {previous.name}
            </span>
          </Link>
        ) : null}
        {next ? (
          <Link href={`/work/${next.slug}`}>
            <span>
              <small>Next case</small>
              {next.name}
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : null}
      </nav>

      <ContactPanel compact />
    </main>
  );
}
