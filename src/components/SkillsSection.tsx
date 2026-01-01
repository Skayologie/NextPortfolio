"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BubbleBackground } from "./animate-ui/components/backgrounds/bubble";
import { TiltEffect } from "./tilt-effect";
import { useMotionValue, useTransform, useSpring } from "framer-motion";
const skills = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

// Bubble component with 3D parallax effect
// Define the skill type based on your array
interface Skill { 
    name: string; 
    icon: string; 
}

// Bubble component with 3D parallax effect
const BubbleSkill = ({ skill, index }: { skill: Skill; index: number }) => {
    const bubbleRef = useRef<HTMLDivElement>(null);

    // 1. Framer Motion MotionValues for tracking mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // MotionValues for the Glare position (still use state for simplicity/direct CSS)
    const [glareX, setGlareX] = React.useState(50);
    const [glareY, setGlareY] = React.useState(50);

    // 2. Spring configuration for smooth rotation
    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);
    
    // Max rotation in degrees
    const MAX_TILT = 10;
    
    // 3. Transform mouse positions into rotation (Tilt Effect Logic)
    // Note: The input values need to be the raw mouse position relative to center
    // We'll map the range [-50, 50] (or whatever the size is) to [-MAX_TILT, MAX_TILT]
    const rotateX = useTransform(springY, [-50, 50], [MAX_TILT, -MAX_TILT]);
    const rotateY = useTransform(springX, [-50, 50], [-MAX_TILT, MAX_TILT]);

    // 4. Transform mouse position into Z-depth (Pop-out effect)
    // The logo will pop out 15px when the mouse is at the edge, and less when in the center
    const zDepth = useTransform(springX, [-50, 50], [0, 15]); // Example transform, we'll fix the input range below

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!bubbleRef.current) return;
        
        const rect = bubbleRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Map mouse position to a simplified range, e.g., [-50, 50] for easier transform
        const relativeX = (x - centerX) / (centerX / 50); 
        const relativeY = (y - centerY) / (centerY / 50); 

        mouseX.set(relativeX);
        mouseY.set(relativeY);
        
        // Glare position logic (remains the same)
        const glareXPos = (x / rect.width) * 100;
        const glareYPos = (y / rect.height) * 100;
        setGlareX(glareXPos);
        setGlareY(glareYPos);
    };

    const handleMouseLeave = () => {
        // Snap back to center
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={bubbleRef}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
            }}
            viewport={{ once: true }}
            className="group relative flex flex-col items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px",
                // Apply the rotation directly to the main container
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d", // Important for child z-depth
            }}
        >
            {/* Inner Bubble Container - Removed redundant transform/transition */}
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
                    relative
                    w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                    bg-white
                    rounded-full
                    flex items-center justify-center
                    overflow-hidden
                    cursor-pointer
                    transition-all duration-500
                    p-6 md:p-7
                    // *** 3D PUFF EFFECT STYLING (Box-Shadow) ***
                    shadow-[
                        inset_5px_5px_15px_rgba(255,255,255,0.7), 
                        inset_-5px_-5px_15px_rgba(0,0,0,0.1),
                        0_10px_30px_rgba(0,0,0,0.4)
                    ]
                    group-hover:shadow-[
                        inset_5px_5px_15px_rgba(255,255,255,0.7), 
                        inset_-5px_-5px_15px_rgba(0,0,0,0.1),
                        0_20px_60px_rgba(241,90,36,0.3)
                    ]
                "
            >
                {/* Icon Image - Added Z-Depth */}
                <motion.div 
                    // *** Z-DEPTH POP-OUT ***
                    // Static z-depth makes the icon float above the white bubble
                    z={20} 
                    className="relative w-full h-full z-10"
                >
                    <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain drop-shadow-lg"
                        unoptimized
                    />
                </motion.div>

                {/* Animated glare effect */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
                    }}
                />

                {/* Subtle inner glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
            </motion.div>

            {/* Tooltip with animation */}
            <motion.div
                // ... Tooltip logic remains the same (removed for brevity)
            >
                {skill.name}
            </motion.div>
        </motion.div>
    );
};


export function SkillsSection() {
  return (
      <>
        <section id="Skills" className="relative py-32 overflow-hidden z-10 ">

          {/* Floating gradient orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

          <div className="container relative z-10">
            {/* Section Heading */}
            <div className="mb-16">
              <h2 className="text-3xl font-sora font-bold mb-2">My <span className="text-red-500">Tech Stack</span></h2>
            </div>

            {/* Bubbles Grid with 3D effects */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-12 md:gap-16 lg:gap-20 max-w-7xl mx-auto place-items-center">
              {skills.map((skill, index) => (
                <TiltEffect tiltFactor={10} perspective={800}>
                <BubbleSkill key={skill.name} skill={skill} index={index} />
                </TiltEffect>
              ))}
            </div>
          </div>
        </section>
      </>
  );
}
