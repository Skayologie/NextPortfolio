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
    // Common misspellings/transliteration variants of an Arabic name in a
    // French-speaking country (e.g. "Jaouad" is the standard French
    // transliteration of the same name as "Jawad"), plus his handle used
    // across GitHub/npm/Stack Overflow. Tells search engines these all
    // refer to the same entity, so typo'd queries still resolve to him.
    alternateName: [
      'JB',
      'Skayologie',
      'Jaouad Boulmal',
      'Jawad Boulmali',
      'Jawad Boulmale',
      'Jawad Boumal',
      'Boulmal Jawad',
      'جواد بولمال',
      // "Boulmal" is a Darija-origin surname with no single fixed Arabic
      // spelling (unlike "Jawad", which is a standard classical name).
      // These cover the realistic variants for that surname specifically.
      'جواد بو لمال',
      'جواد بلمال',
      'جواد بومال',
      'جواد بولمالي',
    ],
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
      'https://www.npmjs.com/~jawadboulmal',
      'https://stackoverflow.com/users/26262428/skay-37',
      'https://www.instagram.com/skay37_/',
      'https://www.facebook.com/ASMMID',
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
      name: 'DabaDoc',
      url: 'https://www.dabadoc.com/ma',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'YOUCODE - UM6P',
      },
    ],
    knowsAbout: DATA.skills.map((skill) => skill.name),
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

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${DATA.url}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Jawad Boulmal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jawad Boulmal is a Full Stack Developer based in Casablanca, Morocco, currently working at DabaDoc and completing advanced Java/Angular/Spring training at YouCode - UM6P (Mohammed VI Polytechnic University).',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does Jawad Boulmal work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jawad Boulmal builds with Java, Spring Boot, Angular, React, Next.js, TypeScript, Node.js, Ruby on Rails, and Laravel, with additional experience in Docker, AWS, PostgreSQL, MySQL, and Flutter.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does Jawad Boulmal work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jawad Boulmal currently works as a Full Stack Developer at DabaDoc in Casablanca, Morocco, building features in Ruby on Rails, Angular, and React. He previously interned at MediaVerse in Safi, Morocco, on the Qarib app.',
        },
      },
      {
        '@type': 'Question',
        name: 'What projects has Jawad Boulmal built?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Jawad Boulmal has built envault (a git-native .env encryption CLI tool published on npm), WorkPilot, SmartShop, DevHub, L'7sab App, and the Qarib mobile/web application.",
        },
      },
      {
        '@type': 'Question',
        name: 'How can I contact Jawad Boulmal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can contact Jawad Boulmal by email at ${DATA.contact.email}, on LinkedIn, or through the contact form on this website.`,
        },
      },
    ],
  }

  const schemas = [person, website, profilePage, creativeWork, faq];

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