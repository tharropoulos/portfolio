import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Navbar } from "@/components/main-nav";
import ScrollProgressBar from "@/components/scrollbar";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <Navbar
        links={[
          {
            id: "about",
            href: "#about",
            label: "About",
          },
          {
            id: "work",
            href: "#work",
            label: "Work",
          },
          {
            id: "school",
            href: "#school",
            label: "School",
          },
          {
            id: "interests",
            href: "#interests",
            label: "Interests",
          },
        ]}
      />
      <Outlet />
    </div>
  ),
});
