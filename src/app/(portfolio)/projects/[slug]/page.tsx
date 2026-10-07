/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { DATA } from "@/data/resume";
import { getProjects } from "@/lib/portfolio-data";
import { projectPath, projectSlug, projectSummary } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };
async function findProject(params: Props["params"]) {
  const { slug } = await params;
  return (await getProjects()).find(project => projectSlug(project.title) === slug);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await findProject(params);
  if (!project) return {};
  const url = `${DATA.url}${projectPath(project)}`;
  const description = projectSummary(project.description, 30);
  const images = project.image ? [new URL(project.image, DATA.url).href] : [`${DATA.url}/og-image.png`];
  return { title: project.title, description, alternates: { canonical: url }, openGraph: { title: project.title, description, url, images }, twitter: { card: "summary_large_image", title: project.title, description, images } };
}
export default async function Project({ params }: Props) {
  const project = await findProject(params);
  if (!project) notFound();
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: projectSummary(project.description), url: `${DATA.url}${projectPath(project)}`, author: { "@type": "Person", "@id": `${DATA.url}#person`, name: "Jawad Boulmal", url: DATA.url } };
  return <main className="max-w-3xl mx-auto px-6 pt-16 pb-32">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Link href="/projects" className="inline-flex min-h-11 items-center text-sm underline">All projects</Link>
    <h1 className="mt-6 text-3xl sm:text-5xl font-bold tracking-tight">{project.title}</h1>
    <p className="mt-3 text-sm text-muted-foreground">{project.dates}</p>
    {project.image && <img src={project.image} alt={`${project.title} preview`} width={1200} height={750} className="mt-8 w-full aspect-[8/5] object-cover rounded-2xl border border-border" />}
    <article className="prose dark:prose-invert max-w-none mt-8 break-words">
      <Markdown remarkPlugins={[remarkGfm]} components={{ h1: ({ children }) => <h2>{children}</h2> }}>{project.description}</Markdown>
    </article>
    <h2 className="mt-8 text-xl font-semibold">Technologies</h2>
    <ul className="flex flex-wrap gap-2 mt-3">{project.technologies.map(tech => <li key={tech} className="rounded-full border border-border px-3 py-1 text-sm">{tech}</li>)}</ul>
    <div className="flex flex-wrap gap-4 mt-6">{project.links.map((link, i) => <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 underline">{link.type}<span className="sr-only"> (opens in new tab)</span></a>)}</div>
    <p className="mt-10 border-t border-border pt-6">Have a project in mind? <a href={`mailto:${DATA.contact.email}`} className="underline">Contact me</a>.</p>
  </main>;
}
