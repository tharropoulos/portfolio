import { Arrow } from "@/components/arrow";
import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";

export function ExperiencePage() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen w-full max-w-screen-sm flex-col gap-6 bg-background">
        <div className="animate-fadein-slide opacity-0 transition-all [--fadein-delay:10ms]">
          <a href="/">
            <Button
              className="group mb-4 mt-20 h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm lg:mt-28"
              variant="outline"
            >
              <Arrow orientation="left" className="stroke-foreground" /> Go back
            </Button>
          </a>
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

export default ExperiencePage;
