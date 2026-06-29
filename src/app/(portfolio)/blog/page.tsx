import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ChevronRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { getSeoSettings } from "@/lib/portfolio-data";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const ogImageUrl = seo.ogImage.startsWith("http") ? seo.ogImage : `${DATA.url}${seo.ogImage}`;
  const blogDescription = "Thoughts on software development, full stack programming, Java, Angular, React, and more technical insights from Jawad Boulmal.";
  return {
    title: "Blog",
    description: blogDescription,
    keywords: ["Jawad Boulmal Blog", "Full Stack Developer Blog", "Java Programming", "Angular Development", "React Tutorials", "Spring Boot", "TypeScript", "Web Development", "Software Engineering", "Morocco Developer"],
    authors: [{ name: "Jawad Boulmal", url: DATA.url }],
    creator: "Jawad Boulmal",
    publisher: "Jawad Boulmal",
    openGraph: {
      title: `Blog | ${seo.title}`,
      description: blogDescription,
      url: `${DATA.url}/blog`,
      siteName: seo.title,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${seo.title} — Blog`, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog | ${seo.title}`,
      description: blogDescription,
      creator: "@jawadboulmal",
      images: [ogImageUrl],
    },
    alternates: { canonical: `${DATA.url}/blog` },
    robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, noimageindex: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
    category: "technology",
  };
}

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const posts = allPosts;
  const sortedPosts = [...posts].sort((a, b) => (new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1));
  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, { page: currentPage, pageSize: PAGE_SIZE });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Blog <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">{sortedPosts.length} posts</span></h1>
        <p className="text-sm text-muted-foreground mb-8">My thoughts on software development, life, and more.</p>
      </BlurFade>
      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {paginatedPosts.map((post, id) => {
                const slug = post._meta.path.replace(/\.mdx$/, "");
                const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1;
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                    <Link className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href={`/blog/${slug}`}>
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">{String(indexNumber).padStart(2, "0")}.</span>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors">
                            {post.title}
                            <ChevronRight className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
                      </div>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>
          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex gap-3 flex-row items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages}</div>
                <div className="flex gap-2 sm:justify-end">
                  {pagination.hasPreviousPage ? (
                    <Link href={`/blog?page=${pagination.page - 1}`} className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors">Previous</Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">Previous</span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link href={`/blog?page=${pagination.page + 1}`} className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors">Next</Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">Next</span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">No blog posts yet. Check back soon!</p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
