import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { projectDetails } from "@/data/projectDetails";
import { resume } from "@/data/resume";
import { SITE_URL } from "@/data/site";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
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
      <Contact />
    </main>
  );
}
