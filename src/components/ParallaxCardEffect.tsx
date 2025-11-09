// src/components/core/ParallaxCardEffect.jsx

"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Make sure you have this utility function
import { motion, useTransform } from "motion/react";
import ElectricBorder from "./ElectricBorder";

interface CardProps {
  id: number;
  className?: string;
  progress: any;
  range: number[];
  targetScale: number;
  children?: React.ReactNode;
}

export default function ParallaxCardEffect({
  id,
  className,
  progress,
  range,
  targetScale,
  children
}: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
<div className="sticky w-[400px] top-0 flex h-screen items-center justify-center">
  <ElectricBorder
    color="#FE4444"
    speed={1}
    chaos={0.5}
    thickness={2}
    // ✅ define CSS variables dynamically
    style={{
      '--top-offset': `calc(-5vh + ${id * 30}px)`,
      '--left-offset': `calc(-5vw + ${id * 80}px)`,
      borderRadius: 16,
    }}
    className={cn(
      `
      relative flex flex-col rounded-2xl scale-[0.95]
      top-[-5vh + ${id * 30}px] left-[-5vw + ${id * 80}px]
      md:top-[calc(var(--top-offset)*0.6)] md:left-[calc(var(--left-offset)*0.6)]
      `,
      className
    )}
  >
      <motion.div
        style={{
          scale,
        }}
        >
        {children}
      </motion.div>
</ElectricBorder>
    </div>
  );
}