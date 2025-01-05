"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

interface ScrollProgressBarType {
  position?: "bottom" | "top";
  color?: string;
  strokeSize?: number;
  showPercentage?: boolean;
}

export default function ScrollProgressBar({
  position = "bottom",
  color = "hsl(var(--primary))",
  strokeSize = 2,
}: ScrollProgressBarType) {
  const { scrollYProgress } = useScroll();

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  return (
    <div
      className={cn("fixed start-0 end-0 pointer-events-none", {
        "top-0": position === "top",
        "bottom-0": position === "bottom",
      })}
      style={{ height: `${strokeSize + 2}px` }}
    >
      <span
        className="bg-primary h-full w-full block rounded-full"
        style={{
          backgroundColor: color,
          width: `${percentage}%`,
        }}
      ></span>
    </div>
  );
}
