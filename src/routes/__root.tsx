import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Navbar } from "@/components/navbar";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col w-full items-center bg-background">
      <Navbar
        links={[
          {
            id: "home",
            href: "#home",
            label: "Home",
          },
          {
            id: "about",
            href: "#about",
            label: "About",
          },
          {
            id: "experience",
            href: "#experience",
            label: "Experience",
          },
          {
            id: "school",
            href: "#school",
            label: "School",
          },
        ]}
      />
      <Outlet />
    </div>
  ),
});
