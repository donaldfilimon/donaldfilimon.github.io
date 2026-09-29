'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navigation, profile } from '@/content/site';

function isActive(pathname: string, href: string) {
  if (href === '/work')
    return pathname === href || pathname.startsWith('/work/');
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Donald Filimon, home">
        <span className="wordmark-mark" aria-hidden="true">
          DF
        </span>
        <span className="wordmark-copy">
          <strong>Donald Filimon</strong>
          <small>Independent software engineer</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-link" href="/contact">
        <span className="header-status" aria-hidden="true" /> Start a project
        <ArrowRight aria-hidden="true" size={15} />
      </Link>

      <div className="mobile-nav">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                aria-label="Open navigation"
                className="mobile-menu-button"
                size="icon-lg"
                variant="ghost"
              />
            }
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="mobile-sheet" side="right">
            <div className="mobile-sheet-heading">
              <SheetTitle>Navigate</SheetTitle>
              <SheetDescription>
                Work, services, background, and contact.
              </SheetDescription>
            </div>
            <nav aria-label="Mobile navigation" className="mobile-sheet-links">
              <Link href="/" onClick={() => setOpen(false)}>
                <span>00</span> Home
              </Link>
              {navigation.map((item, index) => (
                <Link
                  aria-current={
                    isActive(pathname, item.href) ? 'page' : undefined
                  }
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span> {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-sheet-footer">
              <p>{profile.location}</p>
              <a href={`mailto:${profile.email}`}>Start a Conversation</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
