import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { createLazyFileRoute } from "@tanstack/react-router";

import { AnimatedUnderline } from "@/components/animated-underline";
import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import { Heading } from "@/components/heading";
import { InterestsList } from "@/components/interests-list";
import ScrollProgressBar from "@/components/scrollbar";
import SocialLinks from "@/components/socials";
import { experiences, school } from "@/data/experiences";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen w-full max-w-screen-sm flex-col gap-6 bg-background">
        <ScrollProgressBar color="oklch(0.777 0.152 181.912)" />
        <div className="animate-fadein-slide opacity-0 transition-all [--fadein-delay:0ms]">
          <section id="home" className="mt-24 lg:mt-32">
            <div className="mb-10">
              <h1 className="mb-3 scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                Fanis Tharropoulos
              </h1>
              <h3 className="scroll-m-20 text-lg font-semibold tracking-tight md:text-2xl">
                Software Engineer
              </h3>
            </div>
            <p className="leading-6 text-muted-foreground md:text-xl">
              Hey! I'm Fanis, a software engineer from Greece. This is a small
              cove of the internet where I share my experiences, projects and
              generally things I'm stoked about.
            </p>
            <SocialLinks
              className="my-5 md:my-10"
              socials={[
                {
                  href: "https://github.com/tharropoulos",
                  icon: GitHubLogoIcon,
                },
                {
                  href: "https://www.linkedin.com/in/fanis-tharropoulos-78012622b/",
                  icon: LinkedInLogoIcon,
                },
                {
                  href: "https://x.com/ftharropoulos",
                  icon: TwitterLogoIcon,
                },
              ]}
            />
          </section>
          <div className="flex flex-col gap-20">
            <section id="about" className="flex flex-col">
              <Heading title="About" />
              <div className="flex w-full flex-col">
                <div className="overflow-hidden sm:w-full lg:h-[30rem]">
                  <img
                    src="grad.png"
                    alt=""
                    className="h-full animate-pan-zoom bg-cover object-cover"
                  />
                </div>
                <p className="text-sm font-medium md:text-base">
                  Graduation day!
                </p>
                <p className="text-xs text-muted-foreground md:text-sm">
                  Dec 20, 2024
                </p>
              </div>
              <p className="text-sm leading-6 dark:text-zinc-200 md:text-base md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6">
                I grew up in Kavala, Greece, where my love for computers began
                with gaming as a kid. That passion, combined with my math
                skills, led me to study{" "}
                <span className="text-sm font-semibold underline decoration-teal-400 decoration-dashed md:text-base">
                  Electrical and Computer Engineering at the Aristotle
                  University of Thessaloniki
                </span>
                .
              </p>
              <p className="text-sm leading-6 dark:text-zinc-200 md:text-base md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6">
                For my master's thesis, I focused on{" "}
                <span className="text-sm font-semibold underline decoration-teal-400 decoration-dashed md:text-base">
                  assessing AI code assistants' performance
                </span>
                , specifically GitHub Copilot. I built some machine learning
                tools to improve how these systems respond to prompts, diving
                deep into Python and TypeScript along the way.
              </p>
              <p className="text-sm leading-6 dark:text-zinc-200 md:text-base md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6">
                These days, I'm a Software Engineer at{" "}
                <a
                  href="https://typesense.org/"
                  className="font-extrabold text-teal-600 hover:underline dark:text-teal-300"
                >
                  Typesense
                </a>
                , an open-source search engine for building delightful search
                experiences. I maintain our language clients, integrations with
                frameworks, contribute to core development and provide community
                support through demos, documentation, guides and direct user
                assistance through Slack and GitHub issues.
              </p>
              <p className="text-sm leading-6 dark:text-zinc-200 md:text-base md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6">
                I'm currently working on{" "}
                <a
                  href="https://kyma.ink"
                  className="font-extrabold text-sky-600 transition-all duration-200 hover:text-sky-900 dark:text-sky-300"
                >
                  <AnimatedUnderline
                    animationDelay={0.1}
                    className="stroke-sky-600 transition-all duration-200 hover:stroke-sky-900 dark:stroke-sky-300"
                  >
                    Kyma
                  </AnimatedUnderline>
                </a>{" "}
                (Κῦμα), a TUI presentation tool with a focus on eye candy and
                ease of use.{" "}
                <a
                  href="https://github.com/museslabs/kyma"
                  className="font-extrabold text-sky-600 hover:underline dark:text-sky-300"
                >
                  Drop us a ⭐
                </a>{" "}
              </p>
            </section>
            <section id="work" className="flex flex-col">
              <Heading
                title="Work"
                link={{
                  to: "/experience",
                  preload: "render",
                  resetScroll: true,
                  reloadDocument: false,
                  label: "My full work experience",
                }}
              />
              <WorkExperienceList experiences={[...experiences.slice(0, 1)]} />
            </section>
            <section id="school" className="flex flex-col">
              <Heading title="School" />
              <WorkExperienceList experiences={school} />
            </section>
            <section id="interests" className="flex flex-col">
              <Heading title="Stuff I'm into" />
              <InterestsList />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
