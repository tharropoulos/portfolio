import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The theme's own sizes, so `text-label text-ink-3` isn't read as two colors.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "badge",
            "label",
            "meta",
            "small",
            "note",
            "body",
            "body-lg",
            "title",
            "tool",
          ],
        },
      ],
      "border-w": [{ border: ["hairline"] }],
      "border-w-t": [{ "border-t": ["hairline"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// "Recent pull requests" → "recent-pull-requests", for ids and the links to them.
export function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// "July 2022 - Sept 2022 · Internship / Oct 2022 - Jan 2023 · Full-time" → "2022–23"
export function years(timeframe: string) {
  const ys = timeframe.match(/\d{4}/g) ?? [];
  const start = ys[0];
  const end = /present/i.test(timeframe) ? "now" : ys[ys.length - 1];
  if (!start) return timeframe;
  if (start === end) return start;
  return `${start}–${end === "now" ? "now" : end.slice(2)}`;
}

const months = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

// "July 2022 - Sept 2022 · Internship / Oct 2022 - Jan 2023 · Full-time" →
// { span: "Jul 2022 – Jan 2023", length: "7 mos", kinds: ["Internship", "Full-time"] }
// Months count inclusively, the way LinkedIn counts them, and "now" is the build date.
export function tenure(timeframe: string) {
  const dates = [...timeframe.matchAll(/([a-z]+) (\d{4})|present/gi)].map(
    ([, month, year]) =>
      year ?
        new Date(Number(year), months.indexOf(month.slice(0, 3).toLowerCase()))
      : undefined,
  );
  const kinds = timeframe
    .split("/")
    .flatMap((stint) => stint.split("·")[1]?.trim() ?? []);
  const start = dates[0];
  if (!start) return { span: timeframe, length: undefined, kinds };

  const end = dates[dates.length - 1];
  const last = end ?? new Date();
  const total =
    (last.getFullYear() - start.getFullYear()) * 12 +
    last.getMonth() -
    start.getMonth() +
    1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  const length = [
    y && `${y} yr${y > 1 ? "s" : ""}`,
    m && `${m} mo${m > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    span: `${monthYear.format(start)} – ${end ? monthYear.format(end) : "now"}`,
    length,
    kinds,
  };
}
