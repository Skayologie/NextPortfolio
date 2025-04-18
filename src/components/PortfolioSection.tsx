
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    title: "Food Delivery Solution",
    image: "/lovable-uploads/fe8eab12-30f7-4b96-842c-270d3b6ca6da.png",
    tags: ["UX Design", "App Design", "Dashboard", "Wireframe", "User Research"],
  },
  // Add more items as needed
];

export function PortfolioSection() {
  return (
    <section className="container py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-sora font-bold">
          Let's have a look at my <span className="text-primary">Portfolio</span>
        </h2>
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
          View All
        </button>
      </div>
      <div className="space-y-8">
        {portfolioItems.map((item, index) => (
          <Card key={index} className="bg-black/5 hover:bg-black/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-sora font-semibold">{item.title}</h3>
                <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">1</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative group">
                  <img src={item.image} alt={item.title} className="rounded-lg w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowUpRight className="text-white w-6 h-6" />
                  </div>
                </div>
                {/* Placeholder for more images */}
                <div className="rounded-lg bg-black/5 aspect-video" />
                <div className="rounded-lg bg-black/5 aspect-video" />
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs px-3 py-1 rounded-full bg-black/5">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
