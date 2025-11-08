
import { MonitorSmartphone, Globe, Layout } from "lucide-react";
import CardInfo from "./profileCard";
import { TiltEffect } from "./tilt-effect";

const services = [
  {
    icon: MonitorSmartphone,
    title: "UI/UX Design",
    description: "Creating beautiful and functional user interfaces with the latest design trends.",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Designing responsive and modern websites that capture your brand's essence.",
  },
  {
    icon: Layout,
    title: "Landing Page",
    description: "Crafting high-converting landing pages that drive results.",
  },
];

export function MyResume() {
  return (
    <section id="services" className="container py-24  z-10">
      <h2 className="text-3xl font-sora font-bold mb-2  z-10">My <span className="text-red-500">Resume</span></h2>
      <div className="flex justify-center md:grid-cols-3 ">
        <CardInfo/>
      </div>
    </section>
  );
}
