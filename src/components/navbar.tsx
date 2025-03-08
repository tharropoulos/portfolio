import { Link } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-muted bg-gradient-to-b from-background via-background via-35% to-background/5 py-3 saturate-200 backdrop-blur-lg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-logo">
          <Button variant="ghost" className="hover:bg-transparent">
            <h1 className="font-logo">fanis</h1>
          </Button>
        </Link>

        <ModeToggle className="hidden md:flex" />
      </div>
    </header>
  );
}

export default Navbar;
