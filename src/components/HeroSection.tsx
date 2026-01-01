"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DragConstraints from "./DragConstraints";
import Orb from "./Orb";
import LightRays from "./LightRays";

export function HeroSection() {
  const techStacks = ["Java/Angular", "Laravel/React"];
  const [currentStack, setCurrentStack] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // ... (Your typing effect logic is correct, no changes needed)
    const handleTyping = () => {
      const fullText = techStacks[currentStack];
      
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.substring(0, displayText.length - 1));
          setTypingSpeed(75);
        } else {
          setIsDeleting(false);
          setCurrentStack((prev) => (prev + 1) % techStacks.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentStack, typingSpeed, techStacks]);

  return (
<div className="grid h-[900px] ">

<section className="col-start-1 row-start-1 z-10 container  pt-[7rem] lg:pt-0 flex items-center justify-self-center justify-center overflow-hidden">

      <div className="hero-blob hero-blob-1"></div>

      <div className="hero-blob hero-blob-2"></div>

      <div className="hero-blob hero-blob-3"></div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center max-w-7xl">
          <div className="max-w-4xl">
            {/* ... (Your text and description are correct) ... */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-3"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold leading-tight tracking-tight">
                Full Stack Developer
              </h1>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sora font-bold leading-tight tracking-tight ">
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
  I specialize in building full-stack applications that are accessible,

              responsive, interactive, and dynamic, with a strong focus on delivering

              optimal performance.            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 flex items-center gap-3"
            >
              <div className="scroll-indicator">
                <span></span>
              </div>
            </motion.div>
          </div>
          
          {/* --- START OF FIXES --- */}
          
          {/* FIX 1: Changed w-full to w-[400px] to give the 'auto' column a size */}
          <div className="relative w-[400px] h-[400px] justify-self-center"> 
            
            
            
            {/* FIX 2: Swapped z-index */}
            <div className="absolute inset-0 z-30">
              <Orb
                hoverIntensity={1}
                rotateOnHover={true}
                hue={200  }
                forceHoverState={false}
                className="w-full h-full" // Make sure Orb fills this div
              />
            </div>

            {/* FIX 2 & 3: Swapped z-index & fixed component syntax */}
            <div style={{justifySelf:"center"}} className="absolute inset-0 z-20 flex items-center justify-center">
              {/* FIX 4: Fixed image path */}
                {DragConstraints("./images/profile1.jpg")}
            </div>

          </div>
          {/* --- END OF FIXES --- */}
          
        </div>
      </div>
    </section>
    <LightRays
        raysOrigin="top-center"
        raysColor="#FE4444"
        raysSpeed={1.5}
        lightSpread={2}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays col-start-1 row-start-1 z-20 w-full h-full"
      />
    </div>

  );
}