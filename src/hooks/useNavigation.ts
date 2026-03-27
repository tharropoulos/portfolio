import { useEffect, useRef, useState } from "react";

export interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

export interface UseNavigationProps {
  currentPath: string;
  links: NavigationLink[];
  scrollOffset?: number;
}

export function useNavigation({
  currentPath,
  links,
  scrollOffset = 150,
}: UseNavigationProps) {
  const [activeLink, setActiveLink] = useState(() => links[0]?.id || "");
  const isScrolling = useRef(false);
  const isHomePage = currentPath === "/";

  useEffect(() => {
    if (currentPath === "/") {
      const id = window.location.hash.slice(1);

      if (!id) return;

      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          const offsetPosition = element.offsetTop - scrollOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
          setActiveLink(id);
        }, 100);
      }
    }
  }, [currentPath, scrollOffset]);

  useEffect(() => {
    if (currentPath !== "/") return;

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
  }, [currentPath, links, scrollOffset]);

  const scrollToSection = (id: string) => {
    if (currentPath === "/") {
      const element = document.getElementById(id);
      if (element) {
        isScrolling.current = true;
        setActiveLink(id);
        const offsetPosition = element.offsetTop - scrollOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
        window.history.replaceState({}, "", `/#${id}`);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    } else {
      window.location.assign(`/#${id}`);
    }
  };

  return {
    activeLink,
    scrollToSection,
    isHomePage,
  };
}
