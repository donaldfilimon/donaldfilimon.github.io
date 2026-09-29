import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CircleDot, MapPin } from 'lucide-react';

import { ContactPanel } from '@/components/contact-panel';
import { profile } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Donald Filimon is an independent software engineer building local-first AI runtimes, native systems, developer frameworks, and evidence-gated products.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Donald Filimon',
    description: 'Independent systems engineering from Land O’ Lakes, Florida.',
    url: '/about',
  },
};

const principles = [
  [
    'Evidence before claims',
    'A test, source file, generated artifact, deployed service, and live acceptance each prove something different.',
  ],
  [
    'Privacy by boundary',
    'Local state, credentials, private source, and user authority stay explicit instead of being absorbed into convenience.',
  ],
  [
    'Native where it matters',
    'The interface should belong to its machine and platform, whether that means a terminal, SwiftUI, RealityKit, or the browser.',
  ],
  [
    'Ambition with limits',
    'A strong product can explore a difficult idea while naming uncertainty, failure, and what remains unproven.',
  ],
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero about-page-hero">
        <div className="page-hero-index">03 / About</div>
        <div>
          <p className="eyebrow">Donald Joseph Filimon</p>
          <h1>Engineering across the layers.</h1>
        </div>
        <div className="page-hero-aside">
          <p>
            I build local-first AI runtimes, compilers, and native systems.
            Provenance stays attached. The machine stays yours.
          </p>
          <p className="location-line">
            <MapPin aria-hidden="true" size={16} />
            {profile.location}
          </p>
        </div>
      </section>

      <section className="about-story section">
        <div>
          <p className="eyebrow">The practice</p>
          <h2>Independent Enough to Follow the Problem Across Boundaries.</h2>
        </div>
        <div className="long-copy">
          <p>
            I’m a software engineer and the builder behind {profile.company}. My
            public work spans Swift and LLVM, AI runtime design,
            provenance-aware memory, native Apple applications, declarative UI
            systems, scientific services, and the tooling required to make those
            systems verifiable.
          </p>
          <p>
            That range is useful when the product cannot be solved inside one
            fashionable layer. A model may need a memory contract. A native
            interface may need a compiler-shaped core. A scientific idea may
            need a product that can return “not feasible” as a successful
            result.
          </p>
          <p>
            I prefer direct collaboration, precise boundaries, and artifacts
            that make the next decision easier. The goal is not complexity for
            its own sake; it is a system whose difficult parts remain legible.
          </p>
          <Link className="text-link" href="/work">
            See the Work <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>

      <section className="principles-section section dark-section">
        <div className="case-section-heading">
          <p className="eyebrow">Operating principles</p>
          <h2>4 Ideas That Travel Across Every Stack.</h2>
        </div>
        <div className="principle-grid">
          {principles.map(([title, body], index) => (
            <article key={title}>
              <CircleDot aria-hidden="true" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability-band">
        <p className="eyebrow">Working languages</p>
        <div>
          {profile.disciplines.map((item) => (
            <span key={item} translate="no">
              {item}
            </span>
          ))}
        </div>
        <p>
          The stack follows the system: Rust for controlled runtimes, Swift for
          native products, TypeScript for product surfaces, Python for
          scientific services, and MLIR where compiler structure matters.
        </p>
      </section>

      <ContactPanel />
    </main>
  );
}
