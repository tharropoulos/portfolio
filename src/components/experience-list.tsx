import type { Experience } from "@/data/experiences";

export function WorkExperienceList({
  experiences,
}: {
  experiences: Experience[];
}) {
  return experiences.map((experience, index) => (
    <div
      className={`w-full max-w-2xl border-b border-muted pb-6 shadow-none ${
        index === 0 ? "pt-0" : ""
      } last:border-none`}
      key={index}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-bold md:text-2xl">
          {experience.title} {" · "} {experience.company}
        </h3>
        <span className="text-xs text-muted-foreground md:text-sm">
          {experience.timeframe}
        </span>
      </div>
      <div className="space-y-4">
        {experience.description.map((description, index) => (
          <p
            key={index}
            className="my-5 text-sm leading-6 dark:text-zinc-200 md:text-base md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6"
          >
            {description}
          </p>
        ))}
        {experience.skills && (
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium md:px-3 md:py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  ));
}

export default WorkExperienceList;
