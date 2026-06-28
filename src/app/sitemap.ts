import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url;

  const blogPosts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}