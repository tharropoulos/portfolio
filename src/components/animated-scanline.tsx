import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedScanlineProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
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

const SCANLINES =
  "repeating-linear-gradient(0deg, rgba(20, 184, 166, 0.28) 0px, rgba(20, 184, 166, 0.28) 1px, transparent 1px, transparent 3px)";

const SHIMMER =
  "linear-gradient(90deg, transparent 0%, rgba(153, 246, 228, 0.6) 30%, rgba(45, 212, 191, 0.85) 50%, rgba(153, 246, 228, 0.6) 70%, transparent 100%)";

export function AnimatedScanline({
  children,
  className,
  animationDelay = 0,
}: AnimatedScanlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-0.5 -inset-y-0.5 overflow-hidden"
        style={{ backgroundImage: SCANLINES }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{
          duration: 5.4,
          times: [0, 0.05, 0.92, 1],
          ease: "easeInOut",
          delay: animationDelay,
        }}
      >
        <motion.span
          className="absolute inset-y-0 w-1/2"
          style={{ backgroundImage: SHIMMER }}
          initial={{ x: "-110%" }}
          animate={inView ? { x: "220%" } : { x: "-110%" }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: animationDelay + 0.25,
            repeat: 2,
            repeatDelay: 0.05,
          }}
        />
      </motion.span>
      <span className="relative">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-current"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.91,
          ease: "easeInOut",
          delay: animationDelay + 3.62,
        }}
      />
    </span>
  );
}
