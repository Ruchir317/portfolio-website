import type { Metadata } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ruchir Jadhav — Software Engineer",
  description:
    "MS CS @ USC. Cloud systems, distributed engineering, AI, backend development. AWS SDE Intern.",
  keywords: ["Ruchir Jadhav", "Software Engineer", "USC", "AWS", "Portfolio"],
  openGraph: {
    title: "Ruchir Jadhav — Software Engineer",
    description: "MS CS @ USC. Cloud systems, distributed engineering, AI, backend development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
