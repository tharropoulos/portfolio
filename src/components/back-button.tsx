import { Arrow } from "@/components/arrow";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function BackButton({ href, label, className }: BackButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={`group h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm ${className ?? ""}`}
    >
      <a href={href}>
        <Arrow orientation="left" className="stroke-foreground" />
        {label}
      </a>
    </Button>
  );
}

export default BackButton;
