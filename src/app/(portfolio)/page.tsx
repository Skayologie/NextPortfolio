import { StructuredData } from "@/components/structured-data";
import { getAbout, getWorkExperience, getEducation, getHero, getSkills, getProjects, getHackathons, getActiveTemplate, getTemplateCustomization } from "@/lib/portfolio-data";
import MinimalTemplate from "@/templates/minimal";
import TerminalTemplate from "@/templates/terminal";
import BentoTemplate from "@/templates/bento";
import MagazineTemplate from "@/templates/magazine";
import SidebarTemplate from "@/templates/sidebar";
import GlassTemplate from "@/templates/glass";
import CreativeTemplate from "@/templates/creative";
import BuddyTemplate from "@/templates/buddy";
import type { PortfolioData } from "@/templates/types";

export default async function Page() {
  const [hero, about, work, education, skills, projects, hackathons, activeTemplate] = await Promise.all([
    getHero(),
    getAbout(),
    getWorkExperience(),
    getEducation(),
    getSkills(),
    getProjects(),
    getHackathons(),
    getActiveTemplate(),
  ]);

  const customization = await getTemplateCustomization(activeTemplate);
  const data: PortfolioData = { hero, about, work, education, skills, projects, hackathons, customization };

  const template = (() => {
  switch (activeTemplate) {
    case "terminal":  return <TerminalTemplate data={data} />;
    case "bento":     return <BentoTemplate data={data} />;
    case "magazine":  return <MagazineTemplate data={data} />;
    case "sidebar":   return <SidebarTemplate data={data} />;
    case "glass":     return <GlassTemplate data={data} />;
    case "creative":  return <CreativeTemplate data={data} />;
    case "buddy":     return <BuddyTemplate data={data} />;
    default:          return <MinimalTemplate data={data} />;
  }
  })();
  return <><StructuredData />{template}</>;
}
