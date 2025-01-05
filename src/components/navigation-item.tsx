import { motion } from "motion/react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavigationLink } from "@/hooks/useNavigation";

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
  return (
    <NavigationMenuItem>
      <button onClick={() => onClick(link.id)} className="relative block">
        {isActive && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 bg-muted rounded-lg -z-[1]"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.7,
            }}
          />
        )}
        <NavigationMenuLink className="relative block text-sm font-medium rounded-lg px-3 py-2 transition-colors z-[2] after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px after:bg-foreground after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          {link.label}
        </NavigationMenuLink>
      </button>
    </NavigationMenuItem>
  );
}
