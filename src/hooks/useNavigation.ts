import { useEffect, useRef, useState } from "react";

export interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

export interface UseNavigationProps {
  links: NavigationLink[];
  scrollOffset?: number;
}

export function useNavigation({
  links,
  scrollOffset = 100,
}: UseNavigationProps) {
  const [activeLink, setActiveLink] = useState(() => links[0]?.id || "");
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const sections = links.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + scrollOffset;

      for (const section of sections) {
        if (!section) continue;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveLink(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, scrollOffset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrolling.current = true;
      setActiveLink(id);

      const offsetPosition = element.offsetTop - scrollOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  return {
    activeLink,
    scrollToSection,
  };
}
