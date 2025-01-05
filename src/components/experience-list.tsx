interface Experience {
  title: string;
  company: string;
  timeframe: string;
  description: string;
  skills: string[];
}

export function WorkExperienceList({
  experiences,
}: {
  experiences: Experience[];
}) {
  return experiences.map((experience, index) => (
    <div
      className="w-full max-w-2xl shadow-none py-10 border-b border-muted last:border-none"
      key={index}
    >
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">
          {experience.title} {" · "} {experience.company}
        </h3>
        <span className="text-sm text-muted-foreground">
          {experience.timeframe}
        </span>
      </div>
      <div className="space-y-4">
        <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-200 my-5">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  ));
}

export default WorkExperienceList;
