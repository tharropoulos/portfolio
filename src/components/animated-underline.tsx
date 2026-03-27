import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
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

  useEffect(() => {
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

  const wavePaths =
    linkWidth > 0
      ? [
          `M${linkWidth * 0.05} 5 C ${linkWidth * 0.15} 1, ${linkWidth * 0.25} 9, ${linkWidth * 0.35} 5 C ${linkWidth * 0.45} 1, ${linkWidth * 0.55} 9, ${linkWidth * 0.65} 5 C ${linkWidth * 0.75} 2, ${linkWidth * 0.85} 8, ${linkWidth * 0.95} 5`,
          `M${linkWidth * 0.05} 5.4 C ${linkWidth * 0.15} 2.4, ${linkWidth * 0.25} 8.2, ${linkWidth * 0.35} 4.7 C ${linkWidth * 0.45} 0.8, ${linkWidth * 0.55} 7.4, ${linkWidth * 0.65} 5.6 C ${linkWidth * 0.75} 2.8, ${linkWidth * 0.85} 7.1, ${linkWidth * 0.95} 4.6`,
          `M${linkWidth * 0.05} 4.8 C ${linkWidth * 0.15} 0.9, ${linkWidth * 0.25} 7.5, ${linkWidth * 0.35} 5.5 C ${linkWidth * 0.45} 2.6, ${linkWidth * 0.55} 8.8, ${linkWidth * 0.65} 4.8 C ${linkWidth * 0.75} 1.4, ${linkWidth * 0.85} 7.6, ${linkWidth * 0.95} 5.2`,
          `M${linkWidth * 0.05} 5 C ${linkWidth * 0.15} 1, ${linkWidth * 0.25} 9, ${linkWidth * 0.35} 5 C ${linkWidth * 0.45} 1, ${linkWidth * 0.55} 9, ${linkWidth * 0.65} 5 C ${linkWidth * 0.75} 2, ${linkWidth * 0.85} 8, ${linkWidth * 0.95} 5`,
        ]
      : [];

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
              animate={
                isVisible
                  ? {
                      pathLength: 1,
                      d: wavePaths,
                    }
                  : {
                      pathLength: 0,
                    }
              }
              transition={{
                pathLength: {
                  duration: 1.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: animationDelay + 0.2,
                },
                d: {
                  delay: animationDelay + 1.7,
                  duration: 2.6,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                },
              }}
              d={wavePaths[0]}
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
