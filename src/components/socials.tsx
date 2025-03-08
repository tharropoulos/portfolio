import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

import { cn } from "@/lib/utils";

interface Social {
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

interface SocialLinkProps {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
  socials: Social[];
}

const SocialLink: React.FC<Social> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground",
    )}
  >
    <Icon className="h-4 w-4 md:h-5 md:w-5" />
    <p className="sr-only">{href}</p>
  </a>
);

const SocialLinks: React.FC<SocialLinkProps> = ({ className, socials }) => {
  return (
    <div className={cn("flex gap-4", className)}>
      {socials.map((social, index) => (
        <SocialLink key={index} {...social} />
      ))}
      <a
        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:text-base"
        href="mailto:ftharropoulos@gmail.com"
      >
        ftharropulos@gmail.com
      </a>
    </div>
  );
};

export default SocialLinks;
