
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    title: "Design Unwrapped Behind the Scenes of UI/UX Magic",
    date: "14 Dec, 2023",
    image: "/lovable-uploads/086082af-c6a1-496a-ad0b-8af46adc1c0f.png",
  },
  {
    title: "Sugee: Loan Management System for Busi Sector",
    date: "05 Dec, 2023",
    image: "/lovable-uploads/086082af-c6a1-496a-ad0b-8af46adc1c0f.png",
  },
  {
    title: "Exploring Innovative ways to Invest in Digital Media",
    date: "14 Aug, 2023",
    image: "/lovable-uploads/086082af-c6a1-496a-ad0b-8af46adc1c0f.png",
  },
];

export function BlogSection() {
  return (
    <section className="container py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-sora font-bold">
          From my <span className="text-primary">blog post</span>
        </h2>
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
          View All
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="group">
            <div className="relative mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <button className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-sora font-semibold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
