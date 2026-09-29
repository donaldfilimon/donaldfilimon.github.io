import Link from 'next/link';
import { ArrowUpRight, Contact, Mail } from 'lucide-react';

import { profile } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-heading">
        <p className="eyebrow">Donald Filimon · Independent systems practice</p>
        <p className="footer-title">
          A difficult system
          <br />
          <em>starts with a conversation.</em>
        </p>
      </div>
      <div className="footer-actions">
        <a className="footer-action" href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" size={18} /> Start a project
        </a>
        <a
          className="footer-action footer-action-muted"
          href={profile.linkedIn}
          target="_blank"
          rel="noreferrer"
        >
          <Contact aria-hidden="true" size={18} /> LinkedIn
        </a>
      </div>
      <div className="footer-baseline">
        <p>© 2026 Donald Filimon · {profile.location}</p>
        <nav aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" size={12} />
          </a>
          <a href={profile.alternateGithub} target="_blank" rel="noreferrer">
            Alternate GitHub <ArrowUpRight aria-hidden="true" size={12} />
          </a>
          <a href={profile.sponsors} target="_blank" rel="noreferrer">
            Sponsors <ArrowUpRight aria-hidden="true" size={12} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
