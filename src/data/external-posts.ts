import type { Writing } from "@/lib/blog";

// Posts published on other sites, listed with the ones here.
export const externalPosts: Writing[] = [
  {
    title:
      "Your video on the macOS lock screen needs temporal sub-layers, even empty ones",
    description:
      "phonto puts a video on the macOS lock screen with one command. Getting it to play past the first lock comes down to one encoder setting.",
    date: new Date("2026-11-10"),
    href: "https://museslabs.org/blog/macos-lock-screen/",
    tags: [],
    // As museslabs.org counts it.
    minutesRead: "17 min read",
    venue: "museslabs.org",
  },
];
