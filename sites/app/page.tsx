import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  caseStudies,
  processSteps,
  profile,
  projects,
  services,
} from '@/content/site';

const selected = caseStudies.filter((project) =>
  ['abi', 'gama', 'hydrocycle'].includes(project.slug),
);

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="folio-hero" aria-labelledby="folio-title">
        <div className="folio-hero-top">
          <p className="eyebrow">Independent software engineering</p>
          <p className="folio-location">
            {profile.location} · Working globally
          </p>
        </div>
        <h1 id="folio-title">
          Engineering
          <br />
          the <em>whole system.</em>
        </h1>
        <div className="folio-hero-bottom">
          <p>
            I’m Donald Filimon. I build AI runtimes, compiler tooling, and
            native software, connecting the architecture underneath to the
            product people use.
          </p>
          <Link className="pill-link pill-link-primary" href="/work">
            Explore the work <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
          <dl className="folio-facts">
            <div>
              <dt>{caseStudies.length}</dt>
              <dd>Case studies</dd>
            </div>
            <div>
              <dt>{projects.length}</dt>
              <dd>Projects</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="folio-selected section"
        aria-labelledby="selected-title"
      >
        <div className="folio-section-heading">
          <p className="eyebrow">01 / Selected work</p>
          <h2 id="selected-title">
            Different layers.
            <br />
            One engineering practice.
          </h2>
          <Link className="text-link" href="/work">
            All {projects.length} projects{' '}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="folio-projects">
          {selected.map((project, index) => (
            <Link
              className="folio-project"
              href={`/work/${project.slug}`}
              key={project.slug}
              aria-label={`Read the ${project.name} case study`}
            >
              <span className="folio-project-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="folio-project-name">
                <p className="eyebrow">{project.kindLabel}</p>
                <h3 translate="no">{project.name}</h3>
              </div>
              <div className="folio-project-summary">
                <p>{project.thesis}</p>
                <ul aria-label={`${project.name} technologies`}>
                  {project.stack.slice(0, 3).map((item) => (
                    <li key={item} translate="no">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="folio-project-open" aria-hidden="true">
                <ArrowUpRight size={30} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="folio-practice section"
        aria-labelledby="practice-title"
      >
        <div className="folio-practice-intro">
          <p className="eyebrow">02 / How I can help</p>
          <h2 id="practice-title">
            Depth where
            <br />
            <em>it matters.</em>
          </h2>
          <p>
            For a difficult technical problem, a product crossing platforms, or
            a prototype that needs stronger foundations.
          </p>
          <Link className="text-link" href="/services">
            Explore services <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="folio-service-list">
          {services.map((service) => (
            <Link
              href={`/services#${service.slug}`}
              key={service.slug}
              className="folio-service"
            >
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
              <ArrowUpRight aria-hidden="true" size={23} />
            </Link>
          ))}
        </div>
      </section>

      <section className="folio-method section" aria-labelledby="method-title">
        <div className="folio-section-heading">
          <p className="eyebrow">03 / Working together</p>
          <h2 id="method-title">
            A clear path
            <br />
            through the difficult parts.
          </h2>
          <p>
            Working software and the evidence to understand it, from the first
            useful slice to the handoff.
          </p>
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
        <div className="folio-about">
          <p>Independent practice. Direct collaboration.</p>
          <Link className="text-link" href="/about">
            More about Donald <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
