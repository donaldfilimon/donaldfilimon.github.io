import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site } from "@/content/site";

import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  authors: [{ name: site.fullName, url: site.url }],
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  jobTitle: "Software Engineer",
  sameAs: [site.github, site.linkedIn, site.x, site.domain],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="bg-background sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <SiteHeader />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
