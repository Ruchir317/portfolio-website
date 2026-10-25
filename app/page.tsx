import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projectDetails } from "@/data/projectDetails";
import { resume } from "@/data/resume";
import { SITE_URL } from "@/data/site";

// Without this the home page has no canonical tag and Google chose the www address as the main one.
export const metadata: Metadata = { alternates: { canonical: "/" } };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  sameAs: [resume.links.github, resume.links.linkedin, resume.links.scholar],
};

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={personJsonLd} />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects
        detailSlugs={Object.keys(projectDetails)}
        publications={Object.fromEntries(
          Object.entries(projectDetails).flatMap(([slug, d]) => (d.publication ? [[slug, d.publication.badge]] : []))
        )}
      />
      <Skills />
      <Education />
      <Writing />
      <Contact />
    </main>
  );
}
