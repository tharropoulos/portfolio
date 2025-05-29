import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
  animationDelay?: number;
}

export function AnimatedUnderline({
  children,
  className,
  strokeWidth = 2,
  animationDelay = 0,
}: AnimatedUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [linkWidth, setLinkWidth] = useState(0);

  useLayoutEffect(() => {
    const measureWidth = () => {
      if (ref.current) {
        setLinkWidth(ref.current.offsetWidth);
      }
    };

    measureWidth();

    if (typeof ResizeObserver !== "undefined" && ref.current) {
      const resizeObserver = new ResizeObserver(measureWidth);
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -150px 0px",
        threshold: 0.4,
      },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      {linkWidth > 0 && (
        <motion.span
          className="absolute left-0 -mt-1.5 w-full overflow-hidden"
          style={{ height: "10px", top: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{
            duration: 0.3,
            delay: animationDelay,
          }}
        >
          <svg
            viewBox={`0 0 ${linkWidth} 10`}
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0 }}
              transition={{
                duration: 1.5,
                ease: [0.4, 0, 0.2, 1],
                delay: animationDelay + 0.2,
              }}
              d={`M${linkWidth * 0.05} 5 C ${linkWidth * 0.15} 1, ${linkWidth * 0.25} 9, ${linkWidth * 0.35} 5 C ${linkWidth * 0.45} 1, ${linkWidth * 0.55} 9, ${linkWidth * 0.65} 5 C ${linkWidth * 0.75} 2, ${linkWidth * 0.85} 8, ${linkWidth * 0.95} 5`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.span>
      )}
    </span>
  );
}
