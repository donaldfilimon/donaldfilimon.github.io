import { ArrowRight, Contact, Mail } from 'lucide-react';

import { profile } from '@/content/site';

export function ContactPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`contact-panel ${compact ? 'is-compact' : ''}`}>
      <div>
        <p className="eyebrow">Let’s work together</p>
        <h2>
          {compact
            ? 'What are you building?'
            : 'Bring the problem. We’ll find a starting point.'}
        </h2>
      </div>
      <div className="contact-panel-copy">
        <p>
          Send the problem, who it serves, what already exists, and the
          constraint that keeps resisting the obvious answer.
        </p>
        <div className="contact-panel-actions">
          <a
            className="pill-link pill-link-primary"
            href={`mailto:${profile.email}`}
          >
            <Mail aria-hidden="true" size={17} /> Email Donald
            <ArrowRight aria-hidden="true" size={17} />
          </a>
          <a
            className="pill-link"
            href={profile.linkedIn}
            target="_blank"
            rel="noreferrer"
          >
            <Contact aria-hidden="true" size={17} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
