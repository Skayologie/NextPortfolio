import { createClient } from "./supabase";
import { createAdminClient } from "./supabase-admin";
import { DATA } from "@/data/resume";
import type { TemplateCustomization } from "@/templates/types";
import { TEMPLATE_DEFAULTS } from "@/templates/types";

export type WorkExperience = {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
};

export type Education = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
};

export type HeroData = {
  displayName: string;
  description: string;
  avatarUrl: string;
};

export type SkillData = {
  id: string;
  name: string;
  iconKey: string;
  iconUrl: string;
  sortOrder: number;
};

const NAME_TO_KEY: Record<string, string> = {
  "Java": "java", "Spring Boot": "spring_boot", "JavaScript": "javascript",
  "TypeScript": "typescript", "React": "react", "Next.js": "nextjs",
  "Angular": "angular", "Node.js": "nodejs", "Express": "express",
  "Tailwind CSS": "tailwind", "PHP": "php", "Laravel": "laravel",
  "Firebase": "firebase", "MongoDB": "mongodb", "MySQL": "mysql",
  "AWS": "aws", "Docker": "docker", "Git": "git",
  "Ruby": "ruby", "Ruby on Rails": "rails",
};

export async function getSkills(): Promise<SkillData[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("skills")
      .select("id, name, icon_key, icon_url, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DATA.skills.map((s, i) => ({
        id: String(i),
        name: s.name,
        iconKey: NAME_TO_KEY[s.name] ?? "",
        iconUrl: "",
        sortOrder: i,
      }));
    }
    return data.map((s) => ({
      id: s.id,
      name: s.name,
      iconKey: s.icon_key,
      iconUrl: s.icon_url ?? "",
      sortOrder: s.sort_order,
    }));
  } catch {
    return DATA.skills.map((s, i) => ({
      id: String(i),
      name: s.name,
      iconKey: NAME_TO_KEY[s.name] ?? "",
      iconUrl: "",
      sortOrder: i,
    }));
  }
}

export type BannerData = {
  message: string;
  style: "info" | "success" | "warning" | "promo";
  linkText: string;
  linkUrl: string;
  isActive: boolean;
};

export async function getActiveTemplate(): Promise<string> {
  try {
    const { data } = await createAdminClient()
      .from("settings")
      .select("value")
      .eq("key", "portfolio_template")
      .single();
    return data?.value ?? "minimal";
  } catch {
    return "minimal";
  }
}

export async function getTemplateCustomization(templateKey: string): Promise<TemplateCustomization> {
  const defaults = TEMPLATE_DEFAULTS[templateKey] ?? TEMPLATE_DEFAULTS["minimal"];
  try {
    const { data } = await createAdminClient()
      .from("settings")
      .select("value")
      .eq("key", `template_customization_${templateKey}`)
      .single();
    if (!data?.value) return defaults;
    return { ...defaults, ...JSON.parse(data.value) };
  } catch {
    return defaults;
  }
}

export type ActiveTheme = { themeKey: string; fontFamily: string };

export async function getActiveTheme(): Promise<ActiveTheme> {
  try {
    const { data } = await createAdminClient()
      .from("settings")
      .select("key, value")
      .in("key", ["portfolio_theme", "portfolio_font_family"]);
    const map = Object.fromEntries((data ?? []).map(r => [r.key, r.value]));
    return {
      themeKey: map["portfolio_theme"] ?? "zinc",
      fontFamily: map["portfolio_font_family"] ?? "",
    };
  } catch {
    return { themeKey: "zinc", fontFamily: "" };
  }
}

export async function getBanner(): Promise<BannerData> {
  try {
    const { data } = await createClient()
      .from("banner")
      .select("message, style, link_text, link_url, is_active")
      .eq("id", 1)
      .single();
    if (!data) return { message: "", style: "info", linkText: "", linkUrl: "", isActive: false };
    return {
      message: data.message,
      style: (data.style as BannerData["style"]) ?? "info",
      linkText: data.link_text,
      linkUrl: data.link_url,
      isActive: data.is_active,
    };
  } catch {
    return { message: "", style: "info", linkText: "", linkUrl: "", isActive: false };
  }
}

export async function getHero(): Promise<HeroData> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("hero")
      .select("display_name, description, avatar_url")
      .single();

    if (error || !data) {
      return {
        displayName: DATA.name.split(" ")[0],
        description: DATA.description,
        avatarUrl: DATA.avatarUrl,
      };
    }
    return {
      displayName: data.display_name,
      description: data.description,
      avatarUrl: data.avatar_url,
    };
  } catch {
    return {
      displayName: DATA.name.split(" ")[0],
      description: DATA.description,
      avatarUrl: DATA.avatarUrl,
    };
  }
}

export async function getAbout(): Promise<string> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("about")
      .select("content")
      .single();

    if (error || !data) return DATA.summary;
    return data.content;
  } catch {
    return DATA.summary;
  }
}

export type SeoSettings = {
  title: string;
  description: string;
  keywords: string;
  googleVerification: string;
  ogImage: string;
};

const SEO_DEFAULTS: SeoSettings = {
  title: DATA.name,
  description:
    "Jawad Boulmal — Full Stack Developer at DabaDoc in Casablanca, Morocco. Building with Java, Spring Boot, Angular, React & Next.js.",
  keywords:
    "Jawad Boulmal, Jawad, Boulmal, Jaouad Boulmal, Jawad Boulmali, Jawad Boulmale, Jawad Boumal, جواد بولمال, جواد بو لمال, جواد بلمال, جواد بومال, جواد بولمالي, Jawad Boulmal Developer, Full Stack Developer, Web Developer Morocco, Développeur Web Maroc, Java, Spring Boot, Angular, React, Next.js, TypeScript, Docker, DabaDoc",
  googleVerification: "",
  ogImage: "/og-image.png",
};

export async function getSeoSettings(): Promise<SeoSettings> {
  try {
    const { data } = await createAdminClient()
      .from("settings")
      .select("key, value")
      .in("key", ["seo_title", "seo_description", "seo_keywords", "seo_google_verification", "seo_og_image"]);
    const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
    return {
      title:                map["seo_title"]                 || SEO_DEFAULTS.title,
      description:          map["seo_description"]           || SEO_DEFAULTS.description,
      keywords:             map["seo_keywords"]              || SEO_DEFAULTS.keywords,
      googleVerification:   map["seo_google_verification"]   || SEO_DEFAULTS.googleVerification,
      ogImage:              map["seo_og_image"]              || SEO_DEFAULTS.ogImage,
    };
  } catch {
    return SEO_DEFAULTS;
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("work_experience")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return DATA.work as unknown as WorkExperience[];

    return data.map((item) => ({
      company: item.company,
      href: item.href ?? "#",
      badges: item.badges ?? [],
      location: item.location ?? "",
      title: item.title,
      logoUrl: item.logo_url ?? "",
      start: item.start_date,
      end: item.end_date ?? "Present",
      description: item.description ?? "",
    }));
  } catch {
    return DATA.work as unknown as WorkExperience[];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return DATA.education as unknown as Education[];

    return data.map((item) => ({
      school: item.school,
      href: item.href ?? "#",
      degree: item.degree,
      logoUrl: item.logo_url ?? "",
      start: item.start_year,
      end: item.end_year,
    }));
  } catch {
    return DATA.education as unknown as Education[];
  }
}

export type ProjectLink = {
  type: string;
  href: string;
  icon_type: "github" | "globe";
};

export type ProjectData = {
  title: string;
  href: string;
  dates: string;
  is_active: boolean;
  description: string;
  technologies: string[];
  image: string;
  video: string;
  links: ProjectLink[];
};

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticProjectsFallback();

    return data.map((item) => ({
      title: item.title,
      href: item.href ?? "#",
      dates: item.dates ?? "",
      is_active: item.is_active ?? true,
      description: item.description ?? "",
      technologies: item.technologies ?? [],
      image: item.image ?? "",
      video: item.video ?? "",
      links: (item.links ?? []) as ProjectLink[],
    }));
  } catch {
    return staticProjectsFallback();
  }
}

export type HackathonLink = {
  title: string;
  href: string;
  icon_type: "github" | "globe";
};

export type HackathonData = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image: string;
  mlh: string;
  links: HackathonLink[];
};

export async function getHackathons(): Promise<HackathonData[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("hackathons")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticHackathonsFallback();

    return data.map((item) => ({
      title: item.title,
      dates: item.dates ?? "",
      location: item.location ?? "",
      description: item.description ?? "",
      image: item.image ?? "",
      mlh: item.mlh ?? "",
      links: (item.links ?? []) as HackathonLink[],
    }));
  } catch {
    return staticHackathonsFallback();
  }
}

function staticHackathonsFallback(): HackathonData[] {
  return DATA.hackathons.map((h) => ({
    title: h.title,
    dates: h.dates,
    location: h.location,
    description: h.description,
    image: h.image ?? "",
    mlh: h.mlh ?? "",
    links: h.links.map((l) => ({
      title: l.title,
      href: l.href,
      icon_type: "globe" as const,
    })),
  }));
}

function staticProjectsFallback(): ProjectData[] {
  return DATA.projects.map((p) => ({
    title: p.title,
    href: p.href,
    dates: p.dates,
    is_active: p.active,
    description: p.description,
    technologies: [...p.technologies],
    image: p.image,
    video: p.video,
    links: p.links.map((l) => ({
      type: l.type,
      href: l.href,
      icon_type: l.href.includes("github.com") ? "github" : "globe",
    })) as ProjectLink[],
  }));
}
