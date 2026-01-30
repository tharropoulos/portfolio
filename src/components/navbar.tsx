import { Link } from "@tanstack/react-router";

import { LogoButton } from "@/components/logo-button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 bg-white/40 border-muted py-3 backdrop-blur-lg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between">
        <Link to="/" className="font-logo">
          <LogoButton>fanis</LogoButton>
        </Link>

      </div>
    </header>
  );
}

export default Navbar;
