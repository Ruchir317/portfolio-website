import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { resume } from "@/data/resume";
import { projectDetails } from "@/data/projectDetails";
import { experienceDetails } from "@/data/experienceDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = resume.projects
    .filter((project) => projectDetails[project.slug])
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
    }));

  const experiencePages = resume.experience
    .filter((job) => experienceDetails[job.slug])
    .map((job) => ({
      url: `${SITE_URL}/experience/${job.slug}`,
      lastModified: new Date(),
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    ...projectPages,
    ...experiencePages,
  ];
}
