// src/app/projects/page.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Code, Database, ExternalLink, Github, Smartphone, Star } from "lucide-react";
import { useScroll, cancelFrame, frame, motion } from "motion/react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import ParallaxCardEffect from "./ParallaxCardEffect"; // Adjust path if needed
import { cn } from "@/lib/utils"; // Make sure you have this utility function
import ElectricBorder from "./ElectricBorder";

// Data from your ProjectsPage
const projects = [
  {
    id: 1,
    title: "Qarib App",
    description: "Qarib is a Flutter app that connects users with local service providers for easy booking and real-time order tracking.",
    image: "https://qarib.ma/logo.jpeg",
    category: "mobile",
    technologies: ["Flutter", "Nest.js", "MySQL", "Digital Ocean", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "07/07/2025"
  },
  {
    id: 2,
    title: "Code Space — Developer Community",
    description: "A community platform for developers to share knowledge, discuss programming topics, and collaborate on projects.",
    image: "/projects/codespace.jpg", // Make sure image paths are correct
    category: "fullstack",
    technologies: ["Laravel","PHP","Blade","MySQL", "JavaScript", "Tailwind", "AJAX"],
    liveUrl: "#",
    githubUrl: "https://github.com/Skayologie/CodeSpace/tree/develop",
    featured: false,
    year: "04/05/2025"
  },
  {
    id: 3,
    title: "Event Management Platform",
    description: "An Eventbrite-inspired platform that enables users to create, discover, and manage events easily.",
    image: "/projects/Eventbrite.png", // Make sure image paths are correct
    category: "fullstack",
    technologies: ["PHP","HTML","CSS3", "JavaScript","AJAX", "Tailwind"],
    liveUrl: "#",
    githubUrl: "https://github.com/Skayologie/Eventbrite",
    featured: false,
    year: "18/01/2025"
  },
  {
    id: 4,
    title: "Scrum Board Tasks Manager",
    description: "An interactive, user-friendly Scrum Board task management application built with JavaScript Vanilla.",
    image: "https://raw.githubusercontent.com/aymanebenhima/YouCodeScrumBoard/refs/heads/main/design/desktop.png",
    category: "fullstack",
    technologies: ["HTML","CSS3", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/Skayologie/Scrum-Board",
    featured: false,
    year: "05/11/2024"
  },
];

export type ProjectType = (typeof projects)[number];

// --- CARD COMPONENT (NOW SIMPLIFIED) ---
// It no longer holds state. It just receives props and renders.
const ProjectParallaxCard = ({ 
  item, 
  id, 
  totalItems,
  progress 
}: { 
  item: ProjectType; 
  id: number; 
  totalItems: number;
  progress: any; 
}) => {
  const targetScale = 1 ;

  return (



    <ParallaxCardEffect
      id={id}
      progress={progress}
      range={[id * 0.25, 1]} // This range might need tweaking based on totalItems
      targetScale={targetScale}
      className={cn(
        "h-[600px] w-[900px] max-w-[90vw] flex justify-center align-middle border border-white/10 bg-gray-900 p-8 shadow-2xl"
      )}
    >
          
      <div className="flex h-full w-full flex-col">
        {/* Card Header with Image */}
        <div className="relative mb-6 flex-shrink-0">
          <div className="absolute top-2 right-2 z-10">
            {item.featured && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                <Star className="h-3 w-3" /> Featured
              </div>
            )}
          </div>
          <img 
            src={item.image} 
            alt={item.title} 
            className="h-48 w-full rounded-lg object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        {/* Card Body */}
        <div className="flex flex-grow flex-col">
          <h2 className="mb-2 text-3xl font-bold text-white">{item.title}</h2>
          <p className="flex-grow text-gray-400">{item.description}</p>
          
          {/* Technologies */}
          <div className="my-4 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex gap-4 pt-4">
            <a href={item.liveUrl} className="flex-1 rounded-lg bg-orange-500 py-2 text-center font-semibold text-white transition hover:bg-orange-600">
              Live Demo
            </a>
            <a href={item.githubUrl} className="flex-1 rounded-lg bg-gray-700 py-2 text-center font-semibold text-gray-200 transition hover:bg-gray-600">
              View Code
            </a>
          </div>
        </div>
      </div>

    </ParallaxCardEffect>

  );
};


// --- MAIN PAGE COMPONENT ---
export default function ProjectsParallaxPage() {
  const lenisRef = useRef<LenisRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- STATE MOVED HERE ---
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'fullstack', label: 'Full Stack', icon: Database },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  // --- SCROLL TO TOP ON FILTER CHANGE ---
  useEffect(() => {
    // This is crucial to reset the scroll animation
    lenisRef.current?.lenis?.scrollTo("#projects", { duration: 2 });
  }, [activeFilter]);

  // --- FILTERED LIST CREATED HERE ---
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      
      {/* --- FILTER UI MOVED HERE (STICKY HEADER) --- */}
       <div className="container sticky top-20  z-10">
               <h2 className="text-3xl font-sora font-bold">
          My <span className="text-red-500">Projects</span>
        </h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-0 z-50 md:flex flex-row hidden justify-center gap-4 py-6 "
      >

        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            
        <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-orange-500 border border-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </motion.button>
            
          );
        })}
      </motion.div>
       </div>

      {/* Container ref must wrap the spacers and the content */}
      <div ref={containerRef} id="projects" className="relative flex md:justify-center md:align-middle text-white">
        
        {/* --- MAP OVER FILTERED LIST --- */}
        <div className="mx-auto max-w-5xl pt-14 ">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <ProjectParallaxCard 
                item={project} 
                key={project.id} 
                id={i} 
                totalItems={filteredProjects.length}
                progress={scrollYProgress}
              />
            ))
          ) : (
            // Show a message if no projects match
            <div className="flex h-[50vh] items-center justify-center">
              <p className="text-2xl text-gray-500">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}