import { DATA } from '@/data/resume'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jawad Boulmal',
    alternateName: 'JB',
    description: DATA.description,
    url: DATA.url,
    image: `${DATA.url}/profile1.jpg`,
    sameAs: [
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'Morocco',
    },
    email: DATA.contact.email,
    telephone: DATA.contact.tel,
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'MediaVerse',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Safi',
        addressCountry: 'Morocco',
      },
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'YOUCODE - UM6P',
        description: 'Développeur Web Full Stack (Java/Angular/Spring)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Lycée Albouhtouri Casablanca',
        description: 'Baccalauréat Sciences Expérimentales Option SVT',
      },
    ],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'Angular',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'AWS',
      'Laravel',
      'PHP',
      'Flutter',
      'Nest.js',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Full Stack Developer',
        educationalLevel: 'Professional Training',
        credentialCategory: 'degree',
      },
    ],
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: DATA.name,
    description: DATA.description,
    url: DATA.url,
    author: {
      '@type': 'Person',
      name: 'Jawad Boulmal',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    genre: 'Portfolio',
    keywords: 'Full Stack Developer, Java, Angular, React, Next.js, Morocco',
  }

  const portfolioStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${DATA.url}#portfolio`,
    name: 'Jawad Boulmal Portfolio',
    description: 'Professional portfolio showcasing full stack development projects',
    url: DATA.url,
    author: {
      '@type': 'Person',
      name: 'Jawad Boulmal',
    },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US',
    genre: 'Portfolio',
    workExample: DATA.projects.map((project) => ({
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.description,
      url: project.href,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      programmingLanguage: project.technologies,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
    </>
  )
}