import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { createLazyFileRoute } from "@tanstack/react-router";

import WorkExperienceList from "@/components/experience-list";
import Footer from "@/components/footer";
import ScrollProgressBar from "@/components/scrollbar";
import SocialLinks from "@/components/socials";
import { experiences } from "@/data/experiences";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <main className="min-h-screen flex flex-col w-full bg-background mx-auto max-w-screen-sm gap-10 px-4 sm:px-6">
        <ScrollProgressBar />
        <section id="home" className="mt-32">
          <div className="mb-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
              Fanis Tharropoulos
            </h1>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Software Engineer
            </h3>
          </div>
          <p className="text-xl text-muted-foreground">
            Software engineer with an MSc in Electrical and Computer
            Engineering, passionate about free and open source software.
          </p>
          <SocialLinks
            className="my-10"
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
        <section id="about" className="flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            About Me
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200">
            Originally from Kavala, Greece, I developed a passion for computers
            through gaming from a young age, which, along with my strong
            background in mathematics, led me to study{" "}
            <b>
              Electrical and Computer Engineering at the Aristotle University of
              Thessaloniki
            </b>
            .
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200">
            During my master's thesis, I focused on{" "}
            <b>enhancing AI code assistants' performance</b>, specifically
            GitHub Copilot, developing <b>machine learning </b> approaches to
            improve <b>prompt engineering</b> while working extensively with
            Python and TypeScript.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200">
            Currently, I'm a Software Engineer at{" "}
            <a
              href="https://typesense.org/"
              className="font-bold hover:underline"
            >
              Typesense
            </a>
            , an open-source search engine alternative to Algolia and Pinecone,
            where I maintain our language clients, contribute to core
            development and provide community support through demos,
            documentation, guides and direct user assistance through Slack and
            GitHub issues.
          </p>
        </section>
        <section id="experience" className="flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Experience
          </h2>
          <WorkExperienceList experiences={experiences} />
        </section>
        <section id="school" className="flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            School
          </h2>
          <div className="w-full max-w-2xl shadow-none py-10 border-b border-muted last:border-none">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">
                MSc, Electrical & Computer Engineering {" · "} Aristotle
                University of Thessaloniki
              </h3>
              <span className="text-sm text-muted-foreground">
                Dec 2018 - Dec 2024
              </span>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200">
              MSc in Electrical and Computer Engineering at Aristotle University
              of Thessaloniki, completing a comprehensive curriculum of 51
              courses totaling 316 ECTS credits. The program covered both
              software and hardware domains, including advanced courses in
              Software Engineering, Machine Learning, and Control Systems. Core
              studies included Computer Architecture, Operating Systems, and
              Database Design, while also diving deep into electrical
              engineering with Power Systems, Electromagnetic Fields, and
              Nuclear Technology. Notable coursework in Optimization Techniques,
              Dynamic Programming, and Robotics bridged theoretical foundations
              with practical applications.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200">
              My thesis, "Evaluating source code generated by LLMs and improving
              the prompt engineering process," focused on analyzing and
              enhancing AI code assistants' performance, specifically GitHub
              Copilot. I developed a full-stack application called Backlogged
              using the T3 stack to collect and analyze 525 code prompts across
              different development scenarios.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const SubmitButton = () => {
  return (
    <button className="group flex items-center justify-center h-8 w-8 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-colors duration-300 ease-in-out">
      <svg
        viewBox="0 0 24 24"
        className="size-4 stroke-[3px] fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
        />
        <polyline
          points="12 5 19 12 12 19"
          className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
        />
      </svg>
    </button>
  );
};

export default SubmitButton;
