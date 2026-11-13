import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef } from "react";

import { useElementWidth, useInViewOnce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface AnimatedCharmProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
  // The cord and its thread, then the bead's rings from the outside in.
  colors: {
    cord: string;
    body: string;
    white: string;
    sky: string;
    pupil: string;
  };
}

const RADIUS = 6.75;
const THREAD = 3.5;
const SAG = 1.9;
// The SVG starts 17px above the span's bottom: past its reserved 10px, then 7px above the
// name's edge. The cord at this y lands where the siblings draw their line.
const Y = 6;
// A bead this big is a long, heavy pendulum: about 24° to one side, a second a swing,
// still within three seconds of the drop. The thread pays out with a yo-yo's overshoot and the
// cord gives under the jolt.
const SWING = {
  type: "spring",
  stiffness: 38,
  damping: 2.6,
  velocity: 150,
} as const;
const PAYOUT = { type: "spring", stiffness: 200, damping: 12.2 } as const;
const GIVE = {
  type: "spring",
  stiffness: 173,
  damping: 8.5,
  velocity: 60,
} as const;
// The inner rings lag the swing by their depth, so they read as layers inside glass.
const LEAN = 1.95;

export function AnimatedCharm({
  children,
  className,
  animationDelay = 0,
  colors,
}: AnimatedCharmProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const width = useElementWidth(ref);
  const inView = useInViewOnce(ref);
  // Reduced motion gets the pendant hanging still: no draw, no drop, no swing.
  const reduce = useReducedMotion();

  const draw = useMotionValue(0);
  const sag = useMotionValue(0);
  const thread = useMotionValue(0);
  const angle = useMotionValue(0);
  const shown = useMotionValue(0);

  // A round cap at pathLength 0 still paints a dot, so the cord hides until it draws.
  const drawn = useTransform(draw, (progress) => (progress > 0.001 ? 1 : 0));
  const cord = useTransform(sag, (dip) => {
    return `M${width * 0.05} ${Y} L${width / 2} ${Y + dip} L${width * 0.95} ${Y}`;
  });
  const radians = useTransform(angle, (degrees) => (degrees * Math.PI) / 180);
  const threadPath = useTransform(
    [sag, thread, radians],
    ([dip, length, theta]: number[]) => {
      const x = width / 2;
      const y = Y + dip;
      return `M${x} ${y} L${x + Math.sin(theta) * length} ${y + Math.cos(theta) * length}`;
    },
  );
  const beadX = useTransform([thread, radians], ([length, theta]: number[]) => {
    return width / 2 + Math.sin(theta) * (length + RADIUS);
  });
  const beadY = useTransform(
    [sag, thread, radians],
    ([dip, length, theta]: number[]) => {
      return Y + dip + Math.cos(theta) * (length + RADIUS);
    },
  );
  const angularVelocity = useVelocity(angle);
  const lean = useTransform(angularVelocity, (speed) => {
    return Math.max(-LEAN, Math.min(LEAN, -speed * 0.012));
  });
  const whiteLean = useTransform(lean, (offset) => offset * 0.25);
  const skyLean = useTransform(lean, (offset) => offset * 0.6);

  const playing = inView && width > 0;

  useEffect(() => {
    if (reduce) {
      draw.set(1);
      sag.set(SAG);
      thread.set(THREAD);
      angle.set(0);
      shown.set(1);
      return;
    }
    if (!playing) return;
    const drop = animationDelay + 1.15;
    const animations = [
      animate(draw, 1, {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
        delay: animationDelay + 0.2,
      }),
      animate(shown, 1, { duration: 0.12, ease: "linear", delay: drop }),
      animate(thread, THREAD, { ...PAYOUT, delay: drop }),
      animate(sag, SAG, { ...GIVE, delay: drop }),
      animate(angle, 0, { ...SWING, delay: drop }),
    ];
    return () => animations.forEach((animation) => animation.stop());
  }, [playing, reduce, animationDelay, draw, sag, thread, angle, shown]);

  return (
    // The pendant hangs past the row's padding, so the span reserves 10px under the name
    // in its markup. The row is its final height before the bead drops, and the bead keeps
    // 8px from the row's edge, or from the description under it on phones.
    <span ref={ref} className={cn("relative inline-block pb-2.5", className)}>
      <span className="relative">{children}</span>
      {width > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-[calc(100%-17px)] overflow-visible"
          width={width}
          height={24}
          fill="none"
        >
          <g stroke={colors.cord} strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d={threadPath}
              strokeWidth={1.25}
              style={{ opacity: shown }}
            />
            <motion.path
              d={cord}
              strokeWidth={2}
              style={{ pathLength: draw, opacity: drawn }}
            />
          </g>
          <motion.g style={{ x: beadX, y: beadY, opacity: shown }}>
            {/* The rings are drawn for this size: omma's own proportions leave them under
                a pixel wide. */}
            <circle r={RADIUS} fill={colors.body} />
            <motion.circle
              r={RADIUS * 0.74}
              fill={colors.white}
              style={{ x: whiteLean }}
            />
            <motion.circle
              r={RADIUS * 0.5}
              fill={colors.sky}
              style={{ x: skyLean }}
            />
            <motion.circle
              r={RADIUS * 0.3}
              fill={colors.pupil}
              style={{ x: lean }}
            />
          </motion.g>
        </svg>
      )}
    </span>
  );
}
