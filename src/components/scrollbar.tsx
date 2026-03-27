"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import React from "react";

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

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-20", className)}
      style={{ height: `${strokeSize + 2}px` }}
    >
      <span
        className="block h-full w-full rounded-full bg-primary"
        style={{
          backgroundColor: color,
          width: `${percentage}%`,
        }}
      ></span>
    </div>
  );
}
