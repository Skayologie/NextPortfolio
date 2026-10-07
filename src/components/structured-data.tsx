import { DATA } from "@/data/resume";
import { getHero, getProjects, getSeoSettings } from "@/lib/portfolio-data";
import { projectPath, projectSummary } from "@/lib/projects";

export async function StructuredData() {
  const [seo, hero, projects] = await Promise.all([getSeoSettings(), getHero(), getProjects()]);
  const personId = `${DATA.url}#person`;
  const graph = [
    {
      "@type": "Person", "@id": personId, name: "Jawad Boulmal",
      alternateName: ["Skayologie"], url: DATA.url,
      description: seo.description, image: new URL(hero.avatarUrl, DATA.url).href,
      sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.LinkedIn.url, "https://www.npmjs.com/~jawadboulmal"],
      jobTitle: "Full Stack Developer", email: DATA.contact.email,
      address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    },
    { "@type": "WebSite", "@id": `${DATA.url}#website`, url: DATA.url, name: seo.title, author: { "@id": personId } },
    { "@type": "ProfilePage", "@id": `${DATA.url}#profilepage`, url: DATA.url, name: seo.title, mainEntity: { "@id": personId } },
    {
      "@type": "ItemList", name: "Projects by Jawad Boulmal", numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem", position: index + 1,
        item: { "@type": "CreativeWork", name: project.title, description: projectSummary(project.description), url: `${DATA.url}${projectPath(project)}`, author: { "@id": personId } },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
