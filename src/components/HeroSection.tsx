"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const techStacks = ["Java/Angular", "Laravel/React"];
  const [currentStack, setCurrentStack] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = techStacks[currentStack];
      
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(fullText.substring(0, displayText.length - 1));
          setTypingSpeed(75);
        } else {
          // Move to next tech stack
          setIsDeleting(false);
          setCurrentStack((prev) => (prev + 1) % techStacks.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentStack, typingSpeed, techStacks]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>
      <div className="hero-blob hero-blob-3"></div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center max-w-7xl">
          <div className="max-w-4xl">
            {/* Hero text - Ali Yara style large typography */}
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

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              I specialize in building full-stack applications that are accessible,
              responsive, interactive, and dynamic, with a strong focus on delivering
              optimal performance.
            </motion.p>

            {/* Scroll indicator */}
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

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden md:block"
          >
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl"></div>
              <img
                src="/images/profile.jpg"
                alt="Jawad Boulmal"
                className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
