import { allPosts } from '@/.content-collections/generated'
import { DATA } from '@/data/resume'

export async function GET() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

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
    <image>
      <url>${DATA.url}/profile1.jpg</url>
      <title>Jawad Boulmal Blog</title>
      <link>${DATA.url}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.summary}]]></description>
      <link>${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, '')}</link>
      <guid isPermaLink="true">${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, '')}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${DATA.contact.email} (Jawad Boulmal)</author>
      <category>Technology</category>
      <category>Programming</category>
      <category>Web Development</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}