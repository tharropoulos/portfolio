import { Link, LinkProps } from "@tanstack/react-router";

import { Arrow } from "@/components/arrow";
import { Button } from "@/components/ui/button";

function Heading({
  title,
  link,
}: {
  title: string;
  link?: LinkProps & { label: string };
}) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-3 text-xl font-semibold tracking-tight first:mt-0 md:pb-6 md:text-3xl">
          {title}
        </h2>
        {link && (
          <Link {...link} resetScroll={true}>
            <Button
              variant={"ghost"}
              className="group h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm"
            >
              {link.label}
              <Arrow orientation="right" className="stroke-foreground" />
            </Button>
          </Link>
        )}
      </div>
      <div className="mb-2 h-0.5 w-1/4 bg-teal-400"></div>
    </>
  );
}

export { Heading };
