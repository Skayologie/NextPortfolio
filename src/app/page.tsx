'use client'
import React, { Component } from 'react'
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MyResume } from "@/components/ServicesSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HireMeSection } from "@/components/HireMeSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ScrollVelocity from '@/components/ui/TextAnimations/ScrollVelocity/ScrollVelocity';
import GlitchText from '@/components/ui/TextAnimations/GlitchText/GlitchText';
import { useEffect, useState } from 'react';
// import { initialBlobityOptions } from "./utils/BlobityConfig";
// import useBlobity from "blobity/lib/react/useBlobity";

export const metadata = {
  title: "Jawad Boulmal",
  description: "I'm a passionate and versatile full-stack web developer with a strong foundation in building dynamic, user-centric applications. Proficient in modern technologies like React and Next.js on the frontend, and PHP (Laravel), Node.js, and SQL on the backend, I specialize in crafting intuitive interfaces and scalable backend systems.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Laravel",
    "JavaScript",
    "Web Development",
    "Portfolio",
    "Frontend",
    "Backend"
  ],
  openGraph: {
    title: "Jawad Boulmal",
    description: "I'm a passionate and versatile full-stack web developer with a strong foundation in building dynamic, user-centric applications. Proficient in modern technologies like React and Next.js on the frontend, and PHP (Laravel), Node.js, and SQL on the backend, I specialize in crafting intuitive interfaces and scalable backend systems.",
    url: "https://jawadboulmal.com/",
    siteName: "Jawad Boulmal",
    type: "website",
  },
};

export default function page()  {

    // First, let's update the props interface for ScrollVelocity
    interface ScrollVelocityProps {
      texts: string[];
      velocity: number;
      className?: string;
    }
    // const storedTheme = localStorage.getItem('theme');
    // const [darkMode, setDarkMode] = useState(storedTheme);
    return (
      <div id="AllParent" className={'light-mode'}>
        <div className={`min-h-screen dark:bg-black dark:text-white`}>
          <Header />
          <HeroSection />
          <div className="">
            <ScrollVelocity
              //@ts-ignore
              texts={["Creative", "Fullstack","Developer"]}
              velocity={100} 
              className="custom-scroll-text w-full flex justify-center text-center text-8xl  "
            />
          </div>
          <MyResume />
          <ExperienceTimeline />
          <BlogSection />
          <Footer />
        </div>
      </div>
    )
  }

