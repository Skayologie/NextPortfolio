"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BubbleBackground } from "./animate-ui/components/backgrounds/bubble";

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
const BubbleSkill = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bubbleRef.current) return;
    
    const rect = bubbleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotX);
    setRotateY(rotY);
    
    // Calculate glare position (percentage)
    const glareXPos = (x / rect.width) * 100;
    const glareYPos = (y / rect.height) * 100;
    
    setGlareX(glareXPos);
    setGlareY(glareYPos);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
      }}
    >
      {/* 3D Bubble Card */}
      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            relative
            w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            bg-white
            rounded-full
            shadow-2xl
            flex items-center justify-center
            overflow-hidden
            cursor-pointer
            group-hover:shadow-[0_20px_60px_rgba(241,90,36,0.3)]
            transition-all duration-500
            p-6 md:p-7
          "
        >
          {/* Icon Image */}
          <div className="relative w-full h-full z-10">
            <Image
              src={skill.icon}
              alt={skill.name}
              fill
              className="object-contain drop-shadow-lg"
              unoptimized
            />
          </div>

          {/* Animated glare effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
            }}
          />

          {/* Subtle inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
        </motion.div>
      </motion.div>

      {/* Tooltip with animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        className="
          absolute -bottom-10 
          px-4 py-2 
          bg-white/10 backdrop-blur-md 
          border border-white/20 
          rounded-full 
          text-xs font-medium 
          whitespace-nowrap 
          pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          shadow-lg
        "
      >
        {skill.name}
      </motion.div>
    </motion.div>
  );
};


export function SkillsSection() {
  return (
      <>
        <section id="Skills" className="relative py-32 overflow-hidden z-10">

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
                <BubbleSkill key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </section>
      </>
  );
}
