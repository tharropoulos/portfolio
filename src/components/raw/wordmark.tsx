// The wordmark: "fanıs" cast in Archivo, with a teal circle for the i's dot. A click
// recasts every letter to another width and weight, and a second click sets them back.
// Until someone reaches for it, the dot bounces now and then like a ball asking to be
// played with, and a note beside the name says it outright until the first click.
//
// The entrance runs in Motion once the island hydrates, so the name is hidden until then.
// Without JS, a noscript style in home-page.astro shows it at rest. Pushed in from
// another page (see push.ts), it arrives already set and skips the entrance.
import type { LegacyAnimationControls } from "motion/react";

import {
  frame,
  motion,
  MotionConfig,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Pose = { w: number; g: number };

const REST: Pose = { w: 62, g: 900 };
const POSES: Pose[] = [
  { w: 62, g: 900 },
  { w: 125, g: 900 },
  { w: 62, g: 200 },
  { w: 125, g: 150 },
  { w: 100, g: 800 },
  { w: 112, g: 450 },
  { w: 75, g: 600 },
];
const LETTERS = [..."fanıs"];
const I = 3;
// The click's hop. The idle bounce is 30% of it: the hero clips the name, and at the
// smallest size there's only about 27px above the dot.
const HOP = 88;
const SQUASH_TIMES = [0, 0.1, 0.18, 0.35, 0.58, 0.63, 0.72, 0.88, 0.92, 1];
const spring = { type: "spring", bounce: 0, visualDuration: 0.2 } as const;
// How far the letters drop in from. The dot falls from higher.
const DROP = 140;

// The entrance, in seconds from hydration. The letters land as a wave whose gaps shrink
// (85, 70, 55, 40ms), so the word arrives as one gesture. After a short beat the dot
// falls onto the finished word, and the note fades in on its impact, as its caption.
const LETTER_AT = [0.06, 0.145, 0.215, 0.27, 0.31];
const DOT_AT = 0.5;
// The dot's spring first reaches the stem about 160ms in. The hero clips most of the fall
// before that, so the impact is the moment people actually see.
const DOT_HITS = DOT_AT + 0.16;
// Reduced motion collapses the entrance into one fade, everything together.
const FADE = { duration: 0.2 };

const far = (from: Pose) => {
  const options = POSES.filter(
    (p) => Math.abs(p.w - from.w) + Math.abs(p.g - from.g) / 10 > 60,
  );
  return options[Math.floor(Math.random() * options.length)];
};

// Each letter drops onto the baseline and overshoots a touch.
const landing = (i: number) => ({
  y: { duration: 0.192, ease: [0.34, 1.56, 0.64, 1] as const, delay: LETTER_AT[i] },
  opacity: { duration: 0.15, delay: LETTER_AT[i] },
});

// The dot lands last, from higher, and bounces like a ball.
const fall = (dot: LegacyAnimationControls, reduce: boolean | null) =>
  dot.start({
    y: 0,
    opacity: 1,
    transition:
      reduce ? FADE : (
        {
          y: {
            type: "spring",
            bounce: 0.3,
            visualDuration: 0.26,
            delay: DOT_AT,
          },
          opacity: { duration: 0.1, delay: DOT_AT },
        }
      ),
  });

// A crouch, a jump, a squash on landing and a smaller bounce.
const bounce = (dot: LegacyAnimationControls) =>
  dot.start({
    y: [0, 0, -HOP * 0.3, 0, -HOP * 0.1, 0, 0],
    scaleY: [1, 0.8, 1.12, 1, 1.06, 0.8, 1, 1, 0.9, 1],
    scaleX: [1, 1.2, 0.88, 1, 0.94, 1.2, 1, 1, 1.1, 1],
    transition: {
      y: {
        duration: 0.72,
        times: [0, 0.1, 0.35, 0.6, 0.75, 0.9, 1],
        ease: ["linear", "easeOut", "easeIn", "easeOut", "easeIn", "linear"],
      },
      scaleY: { duration: 0.72, times: SQUASH_TIMES },
      scaleX: { duration: 0.72, times: SQUASH_TIMES },
    },
  });

// Starts from wherever the dot is, so a click mid-bounce doesn't snap it to the ground.
// It also fades the dot in, for a click that comes before the dot has fallen.
const hop = (dot: LegacyAnimationControls) =>
  dot.start({
    y: [null, -HOP, 0],
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      opacity: { duration: 0.1 },
      y: {
        duration: 0.32,
        times: [0, 0.35, 1],
        ease: ["easeOut", [0.5, 0, 0.75, 0]],
      },
      scaleX: { duration: 0.1 },
      scaleY: { duration: 0.1 },
    },
  });

function Stamp() {
  const [poses, setPoses] = useState<Pose[]>(() => LETTERS.map(() => REST));
  const [cast, setCast] = useState(false);
  const [pressed, setPressed] = useState(false);
  const reduce = useReducedMotion();
  const touched = useRef(false);
  const dot = useAnimationControls();
  // A style holds the pushed-in name at rest until this takes over (see index.css).
  const [arrived] = useState(
    () =>
      typeof document !== "undefined" &&
      !!document.querySelector("[data-arrived]"),
  );

  // Once the entrance has had a moment to sink in, the dot bounces three times, six
  // seconds apart, and stops for good the moment anyone hovers or taps the name.
  useEffect(() => {
    if (arrived) {
      dot.set({ y: 0, opacity: 1 });
      frame.postRender(() =>
        document
          .querySelector("[data-arrived]")
          ?.removeAttribute("data-arrived"),
      );
    } else {
      fall(dot, reduce);
    }
    if (reduce) return;
    let timer = 0;
    const idle = (wait: number, left: number) => {
      timer = window.setTimeout(() => {
        if (touched.current) return;
        bounce(dot);
        if (left > 1) idle(6000, left - 1);
      }, wait);
    };
    idle(2500, 3);
    return () => clearTimeout(timer);
  }, [reduce, dot, arrived]);

  const recast = () => {
    const next = !cast;
    touched.current = true;
    setCast(next);
    setPressed(true);
    LETTERS.forEach((_, i) =>
      window.setTimeout(
        () =>
          setPoses((prev) =>
            prev.map((p, j) =>
              j === i ?
                next ? far(REST)
                : REST
              : p,
            ),
          ),
        i * 70,
      ),
    );
    hop(dot);
  };

  return (
    <button
      type="button"
      className="hero-cast relative mb-[round(-0.12em,1px)] block max-w-full whitespace-nowrap text-start font-cast leading-[round(0.9em,1px)] tracking-[-0.005em] [-webkit-tap-highlight-color:transparent] focus-visible:outline-0"
      onClick={recast}
      onPointerEnter={() => (touched.current = true)}
      // Led by the name on screen, so voice control can press it by what it says.
      aria-label="fanis, recast the letters"
      aria-pressed={cast}
    >
      {LETTERS.map((ch, i) => (
        <motion.span
          key={i}
          className="wordmark-letter inline-block origin-bottom"
          initial={{ y: -DROP, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            arrived ? { duration: 0 }
            : reduce ?
              FADE
            : landing(i)
          }
          aria-hidden="true"
        >
          <motion.span
            className="relative inline-block"
            initial={{ "--w": REST.w, "--g": REST.g } as never}
            animate={{ "--w": poses[i].w, "--g": poses[i].g } as never}
            transition={reduce ? { duration: 0 } : spring}
            style={{
              fontStretch: "calc(var(--w) * 1%)",
              fontWeight: "var(--g)" as never,
            }}
          >
            {ch}
            {i === I && (
              <motion.span
                className="wordmark-dot pointer-events-none absolute left-1/2 origin-bottom rounded-full bg-teal"
                initial={{ y: -DROP * 2.2, opacity: 0 }}
                animate={dot}
              />
            )}
          </motion.span>
        </motion.span>
      ))}
      {/* Inside the button so pressing it works too. It goes after the first click. */}
      <motion.span
        className={cn(
          "wordmark-note absolute left-full top-[27%] ml-[clamp(12px,1.6vw,24px)] whitespace-pre font-dm-mono text-label leading-normal tracking-normal text-ink-3",
          pressed && "pointer-events-none",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: pressed ? 0 : 1 }}
        transition={
          reduce ? FADE
          : pressed ?
            { duration: 0.15, ease: "easeOut" }
          : { duration: 0.3, ease: "easeOut", delay: DOT_HITS }
        }
        aria-hidden="true"
      >
        {"(the name’s\nclickable)"}
      </motion.span>
    </button>
  );
}

export function Wordmark() {
  return (
    <MotionConfig reducedMotion="user">
      <Stamp />
    </MotionConfig>
  );
}
