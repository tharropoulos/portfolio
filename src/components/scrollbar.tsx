"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressBarType {
  color?: string;
  strokeSize?: number;
  className?: string;
}

export default function ScrollProgressBar({
  color = "hsl(var(--primary))",
  strokeSize = 2,
  className,
}: ScrollProgressBarType) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 18,
    mass: 0.55,
  });

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-20", className)}
      style={{ height: `${strokeSize + 2}px` }}
    >
      <motion.span
        className="block h-full w-full origin-left rounded-full bg-primary"
        style={{
          backgroundColor: color,
          scaleX: smoothProgress,
        }}
      />
    </div>
  );
}
