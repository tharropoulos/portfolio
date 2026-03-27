import { motion } from "motion/react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import type { NavigationLink } from "@/hooks/useNavigation";

interface NavigationItemProps {
  link: NavigationLink;
  isActive: boolean;
  onClick: (id: string) => void;
}

export function NavigationItem({
  link,
  isActive,
  onClick,
}: NavigationItemProps) {
  const href = link.href ?? `/#${link.id}`;

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onClick(link.id);
        }}
        className="relative block rounded-lg px-3 py-2 text-xs font-medium transition-colors after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100 md:text-sm"
      >
        {isActive && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 -z-[1] rounded-lg bg-muted/80 backdrop-blur-sm sm:text-sm md:text-base"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.7,
            }}
          />
        )}
        <span className="relative z-[2] block">
          {link.label}
        </span>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
