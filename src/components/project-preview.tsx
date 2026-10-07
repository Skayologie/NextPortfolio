/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { projectPath, projectSummary } from "@/lib/projects";
import type { ProjectData } from "@/lib/portfolio-data";

export function ProjectPreview({ project }: { project: ProjectData }) {
  return <article className="flex flex-col sm:flex-row gap-5 rounded-2xl border border-border p-5 bg-card">
    {project.image && <img src={project.image} alt={`${project.title} preview`} width={320} height={200} loading="lazy" decoding="async" className="w-full sm:w-44 aspect-[8/5] h-auto object-cover rounded-xl self-start" />}
    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-bold tracking-tight"><Link href={projectPath(project)} className="hover:underline">{project.title}</Link></h3>
      {project.dates && <p className="mt-1 text-xs text-muted-foreground">{project.dates}</p>}
      <p className="mt-3 text-muted-foreground leading-relaxed">{projectSummary(project.description)}</p>
      <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map(tech => <li key={tech} className="text-xs rounded-full border border-border px-2 py-1">{tech}</li>)}</ul>
      <div className="flex flex-wrap gap-x-5 mt-3 text-sm font-semibold">
        <Link href={projectPath(project)} className="inline-flex min-h-11 items-center underline underline-offset-4">Project details</Link>
        {project.links.map((link, index) => <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:underline">{link.type}<span className="sr-only"> (opens in new tab)</span></a>)}
      </div>
    </div>
  </article>;
}
