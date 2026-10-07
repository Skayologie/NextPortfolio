import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";
import { getProjects } from "@/lib/portfolio-data";
import { projectPath } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: DATA.url },
    { url: `${DATA.url}/blog` },
    { url: `${DATA.url}/projects` },
    ...projects.map(project => ({ url: `${DATA.url}${projectPath(project)}` })),
    ...allPosts.map(post => ({ url: `${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, "")}`, lastModified: new Date(post.updatedAt ?? post.publishedAt) })),
  ];
}
