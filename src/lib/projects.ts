import type { ProjectData } from "./portfolio-data";

export function projectSlug(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function projectPath(project: Pick<ProjectData, "title">) {
  return `/projects/${projectSlug(project.title)}`;
}

export function projectSummary(description: string, maxWords = 55) {
  const plain = description.replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+.*$/gm, "")
    .replace(/<[^>]*>/g, " ").replace(/[*_`~]/g, "")
    .replace(/^\s*[-+>]\s/gm, "").replace(/\s+/g, " ").trim();
  const words = plain.split(" ");
  return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}…` : plain;
}

function isProjectURL(value: string) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    // A GitHub profile is not a repository or application.
    return url.hostname !== "github.com" || url.pathname.split("/").filter(Boolean).length >= 2;
  } catch { return false; }
}

export function normalizeProject(project: ProjectData): ProjectData {
  return {
    ...project,
    href: isProjectURL(project.href) ? project.href : "",
    links: project.links.filter(link => isProjectURL(link.href)).map(link => {
      const github = new URL(link.href).hostname === "github.com";
      return { ...link, icon_type: github ? "github" : "globe", type: github ? "Code source" : /source/i.test(link.type) ? "Live demo" : link.type };
    }),
  };
}
