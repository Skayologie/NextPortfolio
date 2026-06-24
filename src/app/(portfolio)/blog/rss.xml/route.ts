import { DATA } from '@/data/resume'

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jawad Boulmal Blog</title>
    <description>Thoughts on software development, full stack programming, Java, Angular, React, and more technical insights from Jawad Boulmal.</description>
    <link>${DATA.url}/blog</link>
    <atom:link href="${DATA.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>${DATA.contact.email} (Jawad Boulmal)</managingEditor>
    <webMaster>${DATA.contact.email} (Jawad Boulmal)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
