import type { NavigationLink } from "@/hooks/useNavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { LogoButton } from "@/components/logo-button";
import { NavigationItem } from "@/components/navigation-item";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  currentPath: string;
  links?: NavigationLink[];
  className?: string;
  scrollOffset?: number;
}

function Navbar({
  currentPath,
  links = [],
  className,
  scrollOffset,
}: NavbarProps) {
  const isHomePage = currentPath === "/";
  const showLinks = isHomePage && links.length > 0;
  const retroHref = currentPath === "/experience" ? "/retro/experience" : "/retro";

  const { activeLink, scrollToSection } = useNavigation({
    currentPath,
    links,
    scrollOffset,
  });

  return (
    <header
      className={cn(
        "relative z-10 w-full bg-white/40 border-muted py-3 backdrop-blur-lg dark:bg-zinc-950/40",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between gap-3 px-0 max-sm:px-6">
        {isHomePage ? (
          <LogoButton currentPath={currentPath} onClick={() => scrollToSection("about")}>
            fanis
          </LogoButton>
        ) : (
          <a href="/">
            <LogoButton currentPath={currentPath}>fanis</LogoButton>
          </a>
        )}

        <div className="flex items-center gap-2">
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
          <a
            href={retroHref}
            className="retro-launch group relative inline-flex h-8 w-10 shrink-0 flex-col items-center justify-start rounded-[5px] border border-[#6b6b6b] bg-[#d8d1c2] px-1 pt-1 text-[#111] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7b7b7b,1px_1px_0_#000000] sm:hidden"
            aria-label="Open retro version"
            title="Open retro version"
          >
            <span className="retro-screen flex h-4 w-full items-center justify-center overflow-hidden rounded-[2px] border border-[#2b2b2b] bg-[#95d29c] px-1 font-mono text-[6px] font-bold uppercase tracking-[0.05em] text-[#0f2a12] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
              retro
            </span>
            <span className="retro-slot mt-1 block h-[2px] w-3 rounded-full bg-[#8e877b]" />
            <span className="retro-base mt-auto block h-[3px] w-5 rounded-b-[3px] rounded-t-[2px] border border-[#7a7367] bg-[#c7c0b2]" />
          </a>
        </div>
      </div>

      <a
        href={retroHref}
        className="retro-launch group absolute right-4 top-1/2 hidden h-9 w-11 -translate-y-1/2 flex-col items-center justify-start rounded-[5px] border border-[#6b6b6b] bg-[#d8d1c2] px-1 pt-1 text-[#111] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7b7b7b,1px_1px_0_#000000] sm:inline-flex"
        aria-label="Open retro version"
        title="Open retro version"
      >
        <span className="retro-screen flex h-5 w-full items-center justify-center overflow-hidden rounded-[2px] border border-[#2b2b2b] bg-[#95d29c] px-1 font-mono text-[7px] font-bold uppercase tracking-[0.08em] text-[#0f2a12] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] md:text-[8px]">
          retro
        </span>
        <span className="retro-slot mt-1 block h-[2px] w-4 rounded-full bg-[#8e877b]" />
        <span className="retro-base mt-auto block h-[4px] w-6 rounded-b-[3px] rounded-t-[2px] border border-[#7a7367] bg-[#c7c0b2]" />
      </a>
    </header>
  );
}

export { Navbar };
export default Navbar;
