import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { getProjects } from "@/lib/portfolio-data";
import { ProjectPreview } from "@/components/project-preview";

export const metadata: Metadata = {
  title: "Projects", description: "Explore web applications and developer tools built by Jawad Boulmal.",
  alternates: { canonical: `${DATA.url}/projects` },
  openGraph: { title: "Projects — Jawad Boulmal", url: `${DATA.url}/projects`, description: "Web applications and developer tools built by Jawad Boulmal." },
};
export default async function Projects() {
  const projects = await getProjects();
  return <main className="max-w-3xl mx-auto px-6 pt-16 pb-32">
    <Link href="/" className="inline-flex min-h-11 items-center text-sm underline">Back to home</Link>
    <h1 className="text-4xl font-bold tracking-tight mt-6">Projects</h1>
    <p className="text-muted-foreground mt-3 mb-8">Web applications, backend systems and tools I have worked on.</p>
    <div className="flex flex-col gap-6">{projects.map(project => <ProjectPreview key={project.title} project={project} />)}</div>
  </main>;
}
