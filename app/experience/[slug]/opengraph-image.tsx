import { resume } from "@/data/resume";
import { experienceDetails } from "@/data/experienceDetails";
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Experience of Ruchir Jadhav";

export function generateStaticParams() {
  return Object.keys(experienceDetails).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = resume.experience.find((e) => e.slug === slug);
  return ogCard({
    eyebrow: "Experience",
    title: job ? `${job.role}, ${job.company}` : "Experience",
    footer: job?.dates,
  });
}
