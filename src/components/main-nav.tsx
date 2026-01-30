import { Link, useLocation } from "@tanstack/react-router";
import { LogoButton } from "@/components/logo-button";
import { NavigationItem } from "@/components/navigation-item";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationLink, useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  links?: NavigationLink[];
  className?: string;
  scrollOffset?: number;
}

function Navbar({ links = [], className, scrollOffset }: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const showLinks = isHomePage && links.length > 0;

  const { activeLink, scrollToSection } = useNavigation({
    links,
    scrollOffset,
  });


  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 bg-white/40 border-muted py-3 backdrop-blur-lg dark:bg-zinc-950/40",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-0 max-sm:px-6">
        {isHomePage ? (
          <LogoButton onClick={() => scrollToSection("about")}>fanis</LogoButton>
        ) : (
          <Link to="/">
            <LogoButton>fanis</LogoButton>
          </Link>
        )}

        {showLinks && (
          <NavigationMenu className="w-3/4 gap-1">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationItem
                  key={link.id}
                  link={link}
                  isActive={activeLink === link.id}
                  onClick={scrollToSection}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
}

export { Navbar };
