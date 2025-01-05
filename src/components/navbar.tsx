import { ModeToggle } from "@/components/mode-toggle";
import { NavigationItem } from "@/components/navigation-item";
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

export function Navbar({ links, className, scrollOffset }: NavbarProps) {
  const { activeLink, scrollToSection } = useNavigation({
    links,
    scrollOffset,
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 bg-gradient-to-b backdrop-blur-sm saturate-200 from-background via-background via-35% to-background/5 border-b border-muted",
        className,
      )}
    >
      <div className="flex justify-between items-center mx-auto max-w-screen-sm px-4 sm:px-6">
        <h1 className="font-logo">fanis</h1>
        <NavigationMenu className="px-6 gap-1">
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

export default Navbar;
