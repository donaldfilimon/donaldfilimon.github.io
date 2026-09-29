import type { Metadata } from 'next';
import { ArrowUpRight, Code2, Contact, Mail, MapPin } from 'lucide-react';

import { profile } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Donald Filimon about AI systems architecture, applied product engineering, or evidence-led hardening.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Donald Filimon',
    description: 'Start a conversation about a difficult technical system.',
    url: '/contact',
  },
};

const fitPrompts = [
  'What are you trying to make possible?',
  'Who needs the system, and what do they need to trust?',
  'What already exists—source, prototype, research, or infrastructure?',
  'Which technical or organizational constraint makes the work difficult?',
];

const projectEmail = `mailto:${profile.email}?subject=${encodeURIComponent('Project conversation')}&body=${encodeURIComponent(fitPrompts.map((prompt) => `${prompt}\n\n`).join('\n'))}`;

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="contact-hero">
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="page-hero-index">04 / Contact</div>
        <div className="contact-hero-title">
          <p className="eyebrow">Direct, low-friction contact</p>
          <h1>Let’s talk about your next system.</h1>
        </div>
        <div className="contact-hero-copy">
          <p>
            You do not need a finished specification. A concrete note about the
            problem, the people it serves, and the hard constraint is enough to
            begin.
          </p>
          <a className="contact-email" href={projectEmail}>
            <Mail aria-hidden="true" />
            <span translate="no">
              <small>Start a project conversation</small>
              {profile.email}
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="contact-fit section">
        <div>
          <p className="eyebrow">A useful first note</p>
          <h2>A good place to start.</h2>
          <p>
            The email link opens these prompts in your mail app. Answer what you
            can; a short note is enough. Nothing is sent until you send it.
          </p>
        </div>
        <ol>
          {fitPrompts.map((prompt, index) => (
            <li key={prompt}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{prompt}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="contact-channels section dark-section">
        <div className="case-section-heading">
          <p className="eyebrow">Channels</p>
          <h2>Choose the Path That Fits the Conversation.</h2>
        </div>
        <div className="channel-grid">
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span>
              <small>Project conversations</small>Email
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={profile.linkedIn} target="_blank" rel="noreferrer">
            <Contact aria-hidden="true" />
            <span>
              <small>Professional context</small>LinkedIn
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" />
            <span>
              <small>Public source</small>GitHub
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <div>
            <MapPin aria-hidden="true" />
            <span>
              <small>Based in</small>
              {profile.location}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
