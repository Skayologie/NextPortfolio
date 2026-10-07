import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";

const xml = (value: string) => value.replace(/[<>&"']/g, ch => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[ch]!);

export async function GET() {
  const posts = [...allPosts].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const items = posts.map(post => {
    const url = `${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, "")}`;
    return `<item><title>${xml(post.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.summary)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate></item>`;
  }).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Jawad Boulmal Blog</title><description>Notes on software development by Jawad Boulmal.</description>
<link>${DATA.url}/blog</link><atom:link href="${DATA.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
<language>en-US</language>${items}</channel></rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600" },
  });
}
