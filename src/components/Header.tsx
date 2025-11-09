"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import GooeyNav from "./GooeyNav";

export  function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollYProgress } = useScroll()
  
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("down")

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY.getPrevious?.() ?? 0)
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const items = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#Skills" },
  { label: "Experiences", href: "#" },
  { label: "Resume", href: "#services" },
  { label: "Contact", href: "#" },
];
  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50  backdrop-blur-md border-b border-white/5 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="text-xl font-sora font-bold tracking-tight hover:text-primary transition-colors">
            Jawad Boulmal
          </a>

          {/* Center Navigation */}
          <div className="hidden [@media(min-width:975px)]:flex">
<GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={900}
              colors={[3, 5, 21, 55]}
            />
          </div>
            
            

          {/* Right side - Location, Time & Status */}
          <div className="hidden [@media(min-width:1274px)]:flex items-center gap-6">
            <div className="flex flex-col items-end text-xs text-muted-foreground">
              <span>Marrakesh, MAR</span>
              <span className="font-mono">{currentTime || "00:00:00"}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-500">OPEN TO WORK</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden [@media(max-width:975px)]:flex p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
    <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    originX: 0,
                    zIndex: 9999,
                    backgroundColor: "#EF4444",
                }}
            />
    </>
  );
}
