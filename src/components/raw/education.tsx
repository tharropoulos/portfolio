import type { Experience } from "@/data/experiences";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import { useId, useState } from "react";

import { RoleAt } from "@/components/raw/role-at";
import { school } from "@/data/experiences";
import { cn, years } from "@/lib/utils";

const spring = { type: "spring", bounce: 0, visualDuration: 0.2 } as const;

// Title from the left edge, years on the right by the toggle. On phones the years drop
// under the title so it keeps the full width.
function Row({ item }: { item: Experience }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  // Reduced motion keeps the fade but not the height: the panel opens at full height and
  // fades out before it goes, so the rows below jump into place instead of sliding.
  const reduce = useReducedMotion();

  return (
    <li className="relative isolate border-t-hairline border-ink first:border-t-0">
      <button
        type="button"
        className="-mx-4 grid w-[calc(100%+2rem)] grid-cols-[minmax(0,1fr)_1.5rem] items-baseline gap-x-3.5 gap-y-0.5 px-4 py-4 text-start transition-colors duration-150 ease-out hover:bg-wash active:bg-wash min-[700px]:grid-cols-[minmax(0,1fr)_auto_1.5rem] min-[700px]:gap-5"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <RoleAt
          className="col-start-1 row-start-1 font-[620]"
          role={item.title}
          at={item.company}
        />
        <span
          className="col-start-1 row-start-2 font-dm-mono text-meta tabular-nums text-ink-3 min-[700px]:col-start-2 min-[700px]:row-start-1"
          title={item.timeframe}
        >
          {years(item.timeframe)}
        </span>
        <span
          className={cn(
            "justify-self-end font-dm-mono text-[18px] leading-none transition-transform duration-spring ease-spring motion-reduce:transition-none",
            open && "rotate-45",
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              ...(!reduce && { height: 0 }),
              opacity: 0,
              transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{
              height: reduce ? { duration: 0 } : spring,
              opacity: { duration: 0.2 },
            }}
          >
            <div className="space-y-[0.9em] pb-[22px] text-note text-ink-2">
              {item.description.map((d) => (
                <p key={d} className="max-w-[64ch] text-pretty">
                  {d}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Education() {
  return (
    <MotionConfig reducedMotion="user">
      <ul>
        {school.map((item) => (
          <Row key={item.company} item={item} />
        ))}
      </ul>
    </MotionConfig>
  );
}
