import { DATA } from '@/data/resume'
import { getSeoSettings } from '@/lib/portfolio-data'

const PERSON_ID = `${DATA.url}#person`;

export async function StructuredData() {
  const seo = await getSeoSettings();

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Jawad Boulmal',
    alternateName: 'JB',
    description: seo.description,
    url: DATA.url,
    image: {
      '@type': 'ImageObject',
      url: `${DATA.url}${DATA.avatarUrl}`,
      width: 400,
      height: 400,
    },
    sameAs: [
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    email: DATA.contact.email,
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'MediaVerse',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Safi',
        addressCountry: 'MA',
      },
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'YOUCODE - UM6P',
      },
    ],
    knowsAbout: [
      'Java', 'Spring Boot', 'Angular', 'React', 'Next.js',
      'TypeScript', 'JavaScript', 'Node.js', 'PostgreSQL',
      'MySQL', 'Docker', 'AWS', 'Laravel', 'PHP', 'Flutter', 'Nest.js',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DATA.url}#website`,
    name: seo.title,
    description: seo.description,
    url: DATA.url,
    author: { '@id': PERSON_ID },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
  }

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${DATA.url}#profilepage`,
    url: DATA.url,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-US',
    dateCreated: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    mainEntity: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: DATA.url,
        },
      ],
    },
  }

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${DATA.url}#projects`,
    name: 'Projects by Jawad Boulmal',
    description: 'Open-source and professional projects built by Jawad Boulmal',
    url: DATA.url,
    author: { '@id': PERSON_ID },
    numberOfItems: DATA.projects.length,
    itemListElement: DATA.projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        url: project.href,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        programmingLanguage: project.technologies,
        author: { '@id': PERSON_ID },
      },
    })),
  }

  const schemas = [person, website, profilePage, creativeWork];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}