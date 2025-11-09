'use client'
import React, { Component } from 'react'
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { MyResume } from "@/components/ServicesSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HireMeSection } from "@/components/HireMeSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import ProjectsParallaxPage from "@/components/ProjectsPage";
import { Footer } from "@/components/Footer";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ScrollVelocity from '@/components/ui/TextAnimations/ScrollVelocity/ScrollVelocity';
import GlitchText from '@/components/ui/TextAnimations/GlitchText/GlitchText';
import { useEffect, useState } from 'react';
import ScrollLinked from '@/components/ScrolllLinked';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import Galaxy from '@/components/Galaxy';
// import { initialBlobityOptions } from "./utils/BlobityConfig";
// import useBlobity from "blobity/lib/react/useBlobity";


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
      <div id="AllParent" className={' font-sora '}>
        {/* <GravityStarsBackground style={{position:"fixed" , zIndex: -1}} /> */}
        {/* <StarsBackground style={{position:"fixed" , zIndex: -1}} />  */}
        <Galaxy 
        style={{position:"fixed" , zIndex: -1 , background: "black"}}/>
        <div className={`min-h-screen dark:bg-black dark:text-white`}>
          <ScrollLinked />
          <HeroSection />
          <SkillsSection />
          <div className=" z-10">
            <ScrollVelocity
                          //@ts-ignore
  texts={['Creative', 'Full Stack', 'Developer']} 
  velocity={100} 
              className="custom-scroll-text flex justify-center text-center text-8xl  "

/>
          </div>
          <MyResume />
          <ProjectsParallaxPage />
          <Footer />
        </div>
      </div>
    )
  }

