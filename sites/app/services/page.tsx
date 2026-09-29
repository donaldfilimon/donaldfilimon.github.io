import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { ContactPanel } from '@/components/contact-panel';
import { caseStudies, processSteps, services } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI systems architecture, applied product engineering, and evidence-led hardening for technically demanding products.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Donald Filimon',
    description:
      'Architecture, product engineering, and evidence-led hardening for difficult systems.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero services-page-hero">
        <div className="page-hero-index">02 / Services</div>
        <div>
          <p className="eyebrow">Independent systems practice</p>
          <h1>From architecture to working software.</h1>
        </div>
        <div className="page-hero-aside">
          <p>
            The engagement starts with the system that is difficult to reason
            about and ends with working software plus the evidence needed to
            operate it honestly.
          </p>
        </div>
      </section>

      <section className="services-list section">
        {services.map((service) => (
          <article
            className="service-detail"
            id={service.slug}
            key={service.slug}
          >
            <div className="service-detail-heading">
              <span>{service.number}</span>
              <div>
                <p className="eyebrow">Capability</p>
                <h2>{service.title}</h2>
              </div>
            </div>
            <p className="service-detail-summary">{service.summary}</p>
            <div className="service-detail-columns">
              <div>
                <h3>Good Fit When</h3>
                <ul>
                  {service.fit.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Typical Outputs</h3>
                <ul>
                  {service.outputs.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Related Work</h3>
                <div className="related-work-links">
                  {service.relatedProjects.map((slug) => {
                    const project = caseStudies.find(
                      (item) => item.slug === slug,
                    );
                    return project ? (
                      <Link href={`/work/${project.slug}`} key={slug}>
                        {project.name}
                        <ArrowRight aria-hidden="true" size={14} />
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section working-model-section dark-section">
        <div className="case-section-heading">
          <p className="eyebrow">Working model</p>
          <h2>Understand it. Build it. Prove it.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactPanel />
    </main>
  );
}
