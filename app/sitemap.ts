import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { resume } from "@/data/resume";
import { projectDetails } from "@/data/projectDetails";
import { allPosts } from "@/data/posts";
import { experienceDetails } from "@/data/experienceDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = resume.projects
    .filter((project) => projectDetails[project.slug])
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
    }));

  const experiencePages = resume.experience
    .filter((job) => experienceDetails[job.slug])
    .map((job) => ({
      url: `${SITE_URL}/experience/${job.slug}`,
    }));

  const writingPages = allPosts.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
  }));

  return [
    {
      url: SITE_URL,
    },
    ...(writingPages.length ? [{ url: `${SITE_URL}/writing` }] : []),
    ...writingPages,
    ...projectPages,
    ...experiencePages,
  ];
}
