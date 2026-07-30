import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteProviders } from "@/components/layout/SiteProviders";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { profile } from "@/lib/data";
import "@/app/globals.css";
import "lenis/dist/lenis.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-q952.onrender.com"),
  title: {
    default: "Ashmeet Singh - Backend & AI Engineer",
    template: "%s | Ashmeet Singh",
  },
  description:
    "Backend and AI engineer building production-grade APIs, LLM workflows, and full-stack systems with measurable impact.",
  keywords: [
    "Ashmeet Singh",
    "backend developer",
    "AI engineer",
    "FastAPI",
    "React",
    "LLM",
    "GTBIT",
    "Delhi",
  ],
  openGraph: {
    title: "Ashmeet Singh - Backend & AI Engineer",
    description:
      "GuardAxis, CREDGEN AI, and RAID Nexus - production-grade AI systems",
    url: "https://portfolio-q952.onrender.com",
    siteName: "Ashmeet Singh",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashmeet Singh - Backend & AI Engineer",
    description: "5+ production AI projects | FastAPI | React | LLMs",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    knowsAbout: [
      "FastAPI",
      "React",
      "LLMs",
      "Docker",
      "Machine Learning",
      "Backend Engineering",
    ],
    sameAs: profile.socials.map((link) => link.href),
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <SiteProviders>
          <Script id="person-schema" type="application/ld+json">
            {JSON.stringify(personSchema)}
          </Script>
          {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
            <Script
              async
              defer
              data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
          ) : null}
          <ScrollProgress />
          <GrainOverlay />
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-button border border-accent bg-background px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent transition focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SiteProviders>
      </body>
    </html>
  );
}
