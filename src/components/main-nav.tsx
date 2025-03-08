import { ModeToggle } from "@/components/mode-toggle";
import { NavigationItem } from "@/components/navigation-item";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationLink, useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  links: NavigationLink[];
  className?: string;
  scrollOffset?: number;
}

function Navbar({ links, className, scrollOffset }: NavbarProps) {
  const { activeLink, scrollToSection } = useNavigation({
    links,
    scrollOffset,
  });

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-muted bg-gradient-to-b from-background via-background via-35% to-background/5 py-3 saturate-200 backdrop-blur-lg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 sm:px-6">
        <Button
          onClick={() => scrollToSection("about")}
          variant="ghost"
          className="hover:bg-transparent"
        >
          <h1 className="font-logo">fanis</h1>
        </Button>

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
        <ModeToggle className="hidden md:flex" />
      </div>
    </header>
  );
}

export { Navbar };
