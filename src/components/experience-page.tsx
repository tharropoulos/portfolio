import BackButton from "@/components/back-button";
import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import { Heading } from "@/components/heading";
import { experiences } from "@/data/experiences";

export function ExperiencePage() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen w-full max-w-screen-sm flex-col gap-6 bg-background">
        <div className="animate-fadein-slide opacity-0 transition-all [--fadein-delay:10ms]">
          <BackButton href="/" label="Go back" className="mb-4 mt-20 lg:mt-28" />
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
