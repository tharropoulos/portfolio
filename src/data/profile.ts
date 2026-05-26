export const profile = {
  name: "Fanis Tharropoulos",
  role: "Software Engineer",
  intro:
    "Hey, I'm Fanis, a software engineer living in Athens, Greece. This is where I share projects, experiences, and things I'm excited about.",
  photo: {
    alt: "Laravel News Interview",
    caption: "A quick chat with Eric Barnes at LaraconEU",
    date: "Mar 3, 2026",
  },
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/tharropoulos",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fanis-tharropoulos-78012622b/",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/ftharropoulos",
    },
  ],
  email: "ftharropulos@gmail.com",
  about: [
    {
      beforeHighlight: "I'm a ",
      highlight: "Software Engineer",
      afterHighlight: " at ",
      emphasis: {
        label: "Typesense",
        href: "https://typesense.org/",
      },
      afterEmphasis:
        ", working on an open-source search engine and its language clients, framework integrations, and core features.",
    },
    {
      beforeHighlight: "I studied ",
      highlight:
        "Electrical and Computer Engineering at the Aristotle University of Thessaloniki",
      afterHighlight: ", with my master's thesis exploring ",
      emphasis: {
        label: "how to evaluate and improve AI code assistants",
      },
      afterEmphasis: " like GitHub Copilot.",
    },
    {
      beforeHighlight: "I enjoy all things FOSS, and especially ",
      highlight: "building developer tools in Python, TypeScript",
      afterHighlight:
        " & more, alongside helping the community through documentation, demos, and direct support.",
    },
  ],
  coauthoredOrg: {
    label: "museslabs",
    href: "https://github.com/museslabs",
  },
  coauthoredProjects: [
    {
      name: "Kyma",
      href: "https://github.com/museslabs/kyma",
      description:
        "(κῦμα) is a TUI presentation tool focused on eye candy and ease of use.",
      animation: "wave",
    },
    {
      name: "Stochos",
      href: "https://github.com/museslabs/stochos",
      description:
        "(στόχος) is a keyboard-driven mouse control overlay for Wayland, X11, and macOS.",
      animation: "target",
    },
    {
      name: "Phonto",
      href: "https://github.com/museslabs/phonto",
      description:
        "(φόντο) is a GPU-accelerated video wallpaper program for Wayland compositors and macOS.",
      animation: "scanline",
    },
  ],
} as const;
