import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type AnimatedUnderlineVariant = "wave" | "target";

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
  animationDelay?: number;
  variant?: AnimatedUnderlineVariant;
}

const buildTargetPaths = (width: number) => {
  const peak = (peakX: number) => {
    const x = width * peakX;
    const w = width * 0.04;
    return `M${width * 0.05} 5 L${x - w} 5 L${x} 1 L${x + w} 5 L${width * 0.95} 5`;
  };
  return [peak(0.5), peak(0.8), peak(0.5), peak(0.2), peak(0.5)];
};

const buildWavePaths = (width: number) => {
  const cp = (a: number, b: number, c: number, d: number, e: number, f: number) =>
    `M${width * 0.05} ${a} C ${width * 0.15} ${b}, ${width * 0.25} ${c}, ${width * 0.35} ${d} C ${width * 0.45} ${e}, ${width * 0.55} ${f}, ${width * 0.65} ${a} C ${width * 0.75} ${b}, ${width * 0.85} ${c}, ${width * 0.95} ${d}`;
  return [
    cp(5, 1, 9, 5, 1, 9),
    cp(5.4, 2.4, 8.2, 4.7, 0.8, 7.4),
    cp(4.8, 0.9, 7.5, 5.5, 2.6, 8.8),
    cp(5, 1, 9, 5, 1, 9),
  ];
};

const pathBuilders = {
  wave: buildWavePaths,
  target: buildTargetPaths,
} satisfies Record<AnimatedUnderlineVariant, (width: number) => string[]>;

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setWidth(node.offsetWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

function useInViewOnce(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -150px 0px", threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

export function AnimatedUnderline({
  children,
  className,
  strokeWidth = 2,
  animationDelay = 0,
  variant = "target",
}: AnimatedUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const width = useElementWidth(ref);
  const inView = useInViewOnce(ref);
  const paths = pathBuilders[variant](width);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="relative">{children}</span>
      {width > 0 && (
        <motion.span
          className="absolute left-0 -mt-1.5 w-full overflow-hidden"
          style={{ height: "10px", top: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: animationDelay }}
        >
          <svg
            viewBox={`0 0 ${width} 10`}
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d={paths[0]}
              initial={{ pathLength: 0 }}
              animate={
                inView ? { pathLength: 1, d: paths } : { pathLength: 0 }
              }
              transition={{
                pathLength: {
                  duration: 1.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: animationDelay + 0.2,
                },
                d: {
                  duration: 2.4,
                  ease: "easeInOut",
                  delay: animationDelay + 1.7,
                  repeat: variant === "target" ? 1 : Number.POSITIVE_INFINITY,
                },
              }}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </motion.span>
      )}
    </span>
  );
}
