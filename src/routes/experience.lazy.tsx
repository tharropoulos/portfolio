import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Arrow } from "@/components/arrow";
import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollProgressBar from "@/components/scrollbar";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";

export const Route = createLazyFileRoute("/experience")({
  component: Experience,
});

function Experience() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-28 flex min-h-screen w-full max-w-screen-sm flex-col gap-6 bg-background px-4 sm:px-6">
        <Link to="/">
          <Button className="group" variant="outline">
            <Arrow orientation="left" /> Go back
          </Button>
        </Link>
        <ScrollProgressBar />
        <section id="experience" className="flex flex-col">
          <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
            Experience
          </h2>
          <div className="mb-4 h-0.5 w-1/4 bg-teal-400"></div>
          <WorkExperienceList experiences={experiences} />
        </section>
      </main>
      <Footer />
    </>
  );
}
