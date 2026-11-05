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
