import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { useInViewOnce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface AnimatedScanlineProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
  // The scanlines, the light that sweeps across them and the underline left behind.
  colors: { line: string; shimmer: string; underline: string };
}

export function AnimatedScanline({
  children,
  className,
  animationDelay = 0,
  colors,
}: AnimatedScanlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref);
  // Reduced motion skips the scanlines and the sweep and leaves the underline drawn.
  const reduce = useReducedMotion();
  const play = inView && !reduce;

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-0.5 -inset-y-0.5 overflow-hidden"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${colors.line} 0px, ${colors.line} 1px, transparent 1px, transparent 3px)`,
        }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{
          duration: 5.4,
          times: [0, 0.05, 0.92, 1],
          ease: "easeInOut",
          delay: animationDelay,
        }}
      >
        <motion.span
          className="absolute inset-y-0 w-1/2"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, ${colors.shimmer} 50%, transparent 100%)`,
          }}
          initial={{ x: "-110%" }}
          animate={play ? { x: "220%" } : { x: "-110%" }}
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
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left"
        style={{ background: colors.underline }}
        initial={{ scaleX: 0 }}
        animate={inView || reduce ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          reduce ?
            { duration: 0 }
          : { duration: 0.91, ease: "easeInOut", delay: animationDelay + 3.62 }
        }
      />
    </span>
  );
}
