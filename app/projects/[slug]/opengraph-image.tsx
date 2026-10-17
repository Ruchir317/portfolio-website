import { resume } from "@/data/resume";
import { projectDetails } from "@/data/projectDetails";
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project by Ruchir Jadhav";

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = resume.projects.find((p) => p.slug === slug);
  return ogCard({
    eyebrow: "Project",
    title: project?.name ?? "Project",
    footer: project ? `${project.metric.value} ${project.metric.label}` : undefined,
  });
}
