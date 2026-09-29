import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://donald-filimon.underswitch.chatgpt.site'),
  title: {
    default: 'Donald Filimon — AI Systems & Services',
    template: '%s — Donald Filimon',
  },
  description:
    'Donald Filimon builds AI systems, Swift and LLVM tooling, native products, provenance-aware memory, and scientific software.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Donald Filimon — AI Systems & Services',
    description:
      'AI systems, Swift and LLVM tooling, native products, and scientific software—grounded in inspectable evidence.',
    type: 'website',
    images: [
      {
        url: 'https://donald-filimon.underswitch.chatgpt.site/og.png',
        width: 1600,
        height: 900,
        alt: 'Donald Filimon — AI Systems & Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donald Filimon — AI Systems & Services',
    description:
      'AI systems, Swift and LLVM tooling, native products, and scientific software—grounded in inspectable evidence.',
    images: ['https://donald-filimon.underswitch.chatgpt.site/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1645ef',
  colorScheme: 'light',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
