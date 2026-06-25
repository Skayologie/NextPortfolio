import type { HeroData, WorkExperience, Education, SkillData, ProjectData, HackathonData } from "@/lib/portfolio-data";

export interface TemplateCustomization {
  accentColor: string;
  bgColor: string;
  fontFamily: string;
}

export const TEMPLATE_DEFAULTS: Record<string, TemplateCustomization> = {
  minimal:  { accentColor: "#3b82f6", bgColor: "#ffffff",  fontFamily: "" },
  terminal: { accentColor: "#22c55e", bgColor: "#18181b",  fontFamily: "Geist Mono" },
  bento:    { accentColor: "#6366f1", bgColor: "#f9fafb",  fontFamily: "" },
  magazine: { accentColor: "#ef4444", bgColor: "#ffffff",  fontFamily: "" },
  sidebar:  { accentColor: "#38bdf8", bgColor: "#1e293b",  fontFamily: "" },
  glass:    { accentColor: "#14b8a6", bgColor: "#0f172a",  fontFamily: "" },
  creative: { accentColor: "#818cf8", bgColor: "#1e1b4b",  fontFamily: "" },
  buddy:    { accentColor: "#14b8a6", bgColor: "#0e1c27",  fontFamily: "" },
};

export type PortfolioData = {
  hero: HeroData;
  about: string;
  work: WorkExperience[];
  education: Education[];
  skills: SkillData[];
  projects: ProjectData[];
  hackathons: HackathonData[];
  customization: TemplateCustomization;
};

export type TemplateDef = {
  key: string;
  label: string;
  description: string;
};

export const TEMPLATES: TemplateDef[] = [
  { key: "minimal",  label: "Minimal",  description: "Clean single-column, lots of whitespace" },
  { key: "terminal", label: "Terminal", description: "Dark CLI-inspired, monospace aesthetic" },
  { key: "bento",    label: "Bento",    description: "Mosaic grid of cards, varied sizes" },
  { key: "magazine", label: "Magazine", description: "Bold editorial, oversized typography" },
  { key: "sidebar",  label: "Sidebar",  description: "Sticky sidebar + scrollable main content" },
  { key: "glass",    label: "Glass",    description: "Dark gradient with frosted glass cards" },
  { key: "creative", label: "Creative", description: "Gradient hero, colorful accents, high energy" },
  { key: "buddy",    label: "Buddy",    description: "3D companion follows you through every section" },
];
