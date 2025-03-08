import { useNavigate, useRouter } from "@tanstack/react-router";
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
  scrollOffset = 150,
}: UseNavigationProps) {
  const [activeLink, setActiveLink] = useState(() => links[0]?.id || "");
  const isScrolling = useRef(false);
  const router = useRouter();
  const navigate = useNavigate();

  const isHomePage = router.state.location.pathname === "/";

  useEffect(() => {
    console.log(
      "Route changed, isHomePage:",
      router.state.location.pathname === "/",
    );

    if (router.state.location.pathname === "/" && router.state.location.hash) {
      const id = router.state.location.hash.slice(1); // Remove the # character
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
  }, [
    router.state.location.pathname,
    router.state.location.hash,
    scrollOffset,
  ]);

  useEffect(() => {
    if (router.state.location.pathname !== "/") return;

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
  }, [links, scrollOffset, router.state.location.pathname]);

  const scrollToSection = (id: string) => {
    if (router.state.location.pathname === "/") {
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
    } else {
      navigate({ to: `/#${id}` });
    }
  };

  return {
    activeLink,
    scrollToSection,
    isHomePage,
  };
}
