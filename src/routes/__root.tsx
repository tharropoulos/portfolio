import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <Outlet />
    </div>
  ),
});
