import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { motion, useAnimationControls } from "motion/react";
import { Button } from "@/components/ui/button";

const FONTS = [
  "font-logo",
  "font-serif italic",
  "font-mono tracking-[0.3em] uppercase",
  "font-sans font-black",
  "font-serif font-thin underline",
  "font-mono font-bold lowercase tracking-tighter",
  "font-sans line-through",
  "font-serif font-extrabold uppercase",
  "font-mono italic tracking-widest",
  "font-sans font-light skew-x-12",
  "font-serif font-black tracking-wide",
  "font-mono underline decoration-wavy",
  "font-sans uppercase font-thin -skew-x-6",
  "font-serif font-medium italic tracking-wide",
  "font-mono font-extrabold lowercase",
  "font-sans tracking-[0.5em] uppercase",
  "font-serif font-bold underline decoration-double",
  "font-mono font-light -skew-x-12",
  "font-serif italic font-thin",
  "font-sans font-black tracking-widest uppercase",
] as const;

const HOVER_CYCLE_INTERVAL = 100;

let persistedFontIndex = 0;
let hasPlayedDropAnimation = false;

interface LogoButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function LogoButton({ onClick, children = "fanis" }: LogoButtonProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isHovering, setIsHovering] = useState(false);
  const [fontIndex, setFontIndex] = useState(persistedFontIndex);
  const controls = useAnimationControls();
  const fontBeforeHoverRef = useRef(fontIndex);
  const [shouldPlayDrop] = useState(
    () => isHomePage && !hasPlayedDropAnimation && persistedFontIndex === 0,
  );

  useEffect(() => {
    if (shouldPlayDrop) {
      hasPlayedDropAnimation = true;
      controls.start({
        y: [null, 0, -8, 0, -3, 0],
        opacity: 1,
        scaleY: [1, 0.7, 1.15, 0.9, 1.05, 1],
        scaleX: [1, 1.3, 0.85, 1.1, 0.95, 1],
        transition: {
          y: {
            duration: 1.2,
            times: [0, 0.4, 0.55, 0.7, 0.85, 1],
            ease: [0.34, 1.56, 0.64, 1],
          },
          scaleY: {
            duration: 1.2,
            times: [0, 0.4, 0.55, 0.7, 0.85, 1],
            ease: "easeOut",
          },
          scaleX: {
            duration: 1.2,
            times: [0, 0.4, 0.55, 0.7, 0.85, 1],
            ease: "easeOut",
          },
          opacity: { duration: 0.15 },
        },
      });
    }
  }, [shouldPlayDrop, controls]);

  useEffect(() => {
    persistedFontIndex = fontIndex;
  }, [fontIndex]);

  const handleMouseEnter = () => {
    fontBeforeHoverRef.current = fontIndex;
    setIsHovering(true);
  };

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setFontIndex((i) => (i + 1) % FONTS.length);
    }, HOVER_CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (fontIndex !== fontBeforeHoverRef.current) {
      controls.start({
        scaleX: [1, 0.2, 0.2, 1.15, 0.92, 1.06, 0.98, 1],
        scaleY: [1, 1.4, 1.4, 0.8, 1.12, 0.95, 1.03, 1],
        transition: {
          duration: 1,
          times: [0, 0.12, 0.35, 0.5, 0.65, 0.8, 0.92, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });
    }
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="hover:bg-transparent pl-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.h1
        className={FONTS[fontIndex]}
        initial={shouldPlayDrop ? { y: -100, opacity: 0 } : { opacity: 1 }}
        animate={controls}
        style={{ originX: 0, originY: 1 }}
      >
        {children}
      </motion.h1>
    </Button>
  );
}
