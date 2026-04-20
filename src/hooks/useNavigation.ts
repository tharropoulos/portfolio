import { useEffect, useState } from "react";

export interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

export interface UseNavigationProps {
  currentPath: string;
  links: NavigationLink[];
}

export function useNavigation({
  links,
}: UseNavigationProps) {
  const [activeLink, setActiveLink] = useState(() => links[0]?.id || "");

  useEffect(() => {
    const getActiveLink = () => {
      const currentPath = window.location.pathname;
      const normalizedPath =
        currentPath !== "/" && currentPath.endsWith("/")
          ? currentPath.slice(0, -1)
          : currentPath;

      return links.find((link) => {
        const href = link.href;

        if (!href) {
          return link.id === normalizedPath.replace("/", "");
        }

        if (href !== "/" && normalizedPath.startsWith(`${href}/`)) {
          return true;
        }

        return href === normalizedPath || href === `${normalizedPath}/`;
      })?.id ?? links[0]?.id ?? "";
    };

    const syncActiveLink = () => {
      setActiveLink(getActiveLink());
    };

    syncActiveLink();
    window.addEventListener("popstate", syncActiveLink);
    document.addEventListener("astro:page-load", syncActiveLink);

    return () => {
      window.removeEventListener("popstate", syncActiveLink);
      document.removeEventListener("astro:page-load", syncActiveLink);
    };
  }, [links]);

  return {
    activeLink,
  };
}
