import { interests } from "@/data/interests";

function InterestsList() {
  const types = [...new Set(interests.map((interest) => interest.type))];

  return (
    <div className="flex flex-col gap-6">
      <div className="leading-7 dark:text-zinc-200">
        A list of things I'm currently interested in, either tech or just for
        fun.
      </div>

      <div className="grid grid-cols-2 gap-6">
        {types.map((type) => (
          <div key={type} className="flex flex-col gap-2">
            <div className="font-bold md:text-lg">{type}</div>
            <div className="grid grid-cols-1">
              {interests
                .filter((interest) => interest.type === type)
                .map((interest) => (
                  <a
                    key={interest.title}
                    href={interest.href}
                    className="text-sm hover:underline md:text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {interest.title}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { InterestsList };
