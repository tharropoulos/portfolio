import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { Arrow } from "@/components/arrow";
import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import { Heading } from "@/components/heading";
import ScrollProgressBar from "@/components/scrollbar";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";

export const Route = createLazyFileRoute("/experience")({
  component: Experience,
});

function Experience() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="container mx-auto flex min-h-screen w-full max-w-screen-sm flex-col gap-6 bg-background">
        <ScrollProgressBar color="oklch(0.777 0.152 181.912)" />
        <div className="animate-fadein-slide opacity-0 transition-all [--fadein-delay:10ms]">
          <Link to="/">
            <Button
              className="group mb-4 mt-20 h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm lg:mt-28"
              variant="outline"
            >
              <Arrow orientation="left" className="stroke-foreground" /> Go back
            </Button>
          </Link>
          <Heading title="Experience" />
          <div className="flex flex-col gap-6">
            <WorkExperienceList experiences={experiences} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
