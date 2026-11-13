export const profile = {
  name: "Fanis Tharropoulos",
  role: "Software Engineer",
  intro:
    "Hey, I'm Fanis, a software engineer living in Athens, Greece. This is where I share projects, experiences, and things I'm excited about.",
  photo: {
    alt: "Eric Barnes and Fanis talking on the Laravel News set at Laracon EU",
    caption: "A quick chat with Eric Barnes at LaraconEU",
    date: "Mar 3, 2026",
  },
  githubUsername: "tharropoulos",
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/tharropoulos",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tharropoulos/",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/ftharropoulos",
    },
  ],
  email: "ftharropoulos@gmail.com",
  about: [
    {
      before: "I'm a Software Engineer at ",
      link: { label: "Typesense", href: "https://typesense.org/" },
      after:
        ", working on an open-source search engine and its language clients, framework integrations, and core features.",
    },
    {
      before:
        "I studied Electrical and Computer Engineering at the Aristotle University of Thessaloniki, where my master's thesis explored how to evaluate and improve AI code assistants like GitHub Copilot.",
    },
    {
      before:
        "I enjoy all things FOSS, especially building developer tools in Python, TypeScript & more, alongside helping the community through documentation, demos, and direct support.",
    },
  ],
  coauthoredOrg: {
    label: "museslabs",
    href: "https://museslabs.org",
    site: {
      label: "museslabs.org",
      href: "https://museslabs.org",
    },
  },
  coauthoredProjects: [
    {
      name: "Kyma",
      href: "https://museslabs.org/#kyma",
      description:
        "(κῦμα) is a TUI presentation tool focused on eye candy and ease of use.",
      animation: "wave",
    },
    {
      name: "Stochos",
      href: "https://museslabs.org/#stochos",
      description:
        "(στόχος) is a keyboard-driven mouse control overlay for Wayland, X11, and macOS.",
      animation: "target",
    },
    {
      name: "Phonto",
      href: "https://museslabs.org/#phonto",
      description:
        "(φόντο) is a GPU-accelerated video wallpaper program for Wayland compositors and macOS.",
      animation: "scanline",
    },
    {
      name: "Omma",
      href: "https://museslabs.org/#omma",
      description:
        "(ὄμμα) is an eye-strain break reminder for the macOS menu bar.",
      animation: "charm",
    },
  ],
} as const;
