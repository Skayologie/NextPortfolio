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


export default function page()  {

    // const storedTheme = localStorage.getItem('theme');
    // const [darkMode, setDarkMode] = useState(storedTheme);
    return (
      <div id="AllParent" className={'light-mode'}>
      <div className={`min-h-screen dark:bg-black dark:text-white`}>
          <Header />
          <HeroSection />

          <div className="">
            <ScrollVelocity
              texts={['Creative', 'Fullstack','Developer']} 
              velocity={100} 
              className="custom-scroll-text w-full flex justify-center text-center text-8xl  "
            />
          </div>


          <MyResume />
          {/* <PortfolioSection /> */}
          <ExperienceTimeline />
          {/* <TestimonialsSection /> */}
          {/* <HireMeSection /> */}

          <BlogSection />
          <Footer />
          </div>
      </div>
    )
  }

