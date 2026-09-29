import type { AnchorHTMLAttributes, ReactNode } from 'react';

export default function Link({
  children,
  href,
  onClick,
  scroll: _scroll,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string; scroll?: boolean }) {
  void _scroll;
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
