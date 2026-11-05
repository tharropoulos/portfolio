import { cn } from "@/lib/utils";

// A title and its organisation, joined by a dot that drops out when the organisation
// wraps (see .role-at in index.css). The title takes the parent's weight.
export function RoleAt({
  role,
  at,
  className,
}: {
  role: string;
  at: string;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-x-clip", className)}>
      <span className="role-at">
        <span>{role}</span>
        <span className="font-normal text-ink-2">{at}</span>
      </span>
    </span>
  );
}
