import InfiniteScroll from '../components/ui/Components/InfiniteScroll/InfiniteScroll';
import SpotlightCard from '../components/ui/Components/SpotlightCard/SpotlightCard';
import PixelCard from '../components/ui/Components/PixelCard/PixelCard';
import TiltedCard from '../components/ui/Components/TiltedCard/TiltedCard';
import { ArrowUpRight, Link } from "lucide-react";

const experiences = [
  {
    company: "Event Brite",
    position: " ",
    period: "2025/01/13 -> 2025/01/24",
    image: "./projects/Eventbrite.png",
  },
  {
    company: "FUT Champions Web App Ultimate Team",
    position: "UI/UX Designer",
    period: "2018 - 2020",
  },
  {
    company: "Cinestox, Mumbai",
    position: "Lead UX Designer",
    period: "2015 - 2018",
  },
];


export function ExperienceTimeline() {
  return (
    <section id="experience" className="container py-24">
      <h2 className="text-3xl font-sora font-bold">
        My <span className="text-red-500">Projects</span>
      </h2>
      <div className="relative">
        {/* <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div> */}
        <div className="space-y-12 flex justify-center gap-10">
          <div className="absolute -z-10 top-[-50px] left-20 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
            
            <div style={{height: '500px',width:"100%", position: 'relative'}}  className='flex justify-start '>
              <section className="container py-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {experiences.map((experience, index) => (
                    <div key={index} className="group">
                      <div className="relative mb-4">
                        <img
                          src={experience.image}
                          alt={experience.company}
                          className="w-full aspect-video object-cover rounded-xl"
                        />
                        <a href={"d"} className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-4 h-4" />
                        </a >
                      </div>
                      <h3 className="font-sora font-semibold mb-2 group-hover:text-primary transition-colors">
                        {experience.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">{experience.period}</p>
                      <p className="text-sm text-muted-foreground">{experience.position}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
        </div>
      </div>
    </section>
  );
}
