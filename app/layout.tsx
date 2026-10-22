import type { Metadata, Viewport } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, WRITING_ENABLED } from "@/data/site";
import MotionProvider from "@/components/MotionProvider";
import { themes, themeCss } from "@/lib/palette";
import { themeInitScript } from "@/lib/theme";
import CommandPalette from "@/components/CommandPalette";
import { projectDetails } from "@/data/projectDetails";
import { experienceDetails } from "@/data/experienceDetails";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themes.light.bg },
    { media: "(prefers-color-scheme: dark)", color: themes.dark.bg },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  ...(WRITING_ENABLED ? { alternates: { types: { "application/rss+xml": "/feed.xml" } } } : {}),
  metadataBase: new URL(SITE_URL),
  title: "Ruchir Jadhav — Software Engineer",
  description:
    "MS CS (USC, 2025) and Software Development Engineer. Cloud systems, backend and mobile engineering, distributed systems, and AI/ML.",
  keywords: ["Ruchir Jadhav", "Software Engineer", "USC", "AWS", "Portfolio"],
  openGraph: {
    title: "Ruchir Jadhav — Software Engineer",
    description:
      "MS CS (USC, 2025) and Software Development Engineer. Cloud systems, backend and mobile engineering, distributed systems, and AI/ML.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Animated blocks start hidden until JS runs; without JS they must still be readable. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <CommandPalette detailSlugs={[...Object.keys(projectDetails), ...Object.keys(experienceDetails)]} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
