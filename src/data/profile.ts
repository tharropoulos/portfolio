export const profile = {
  name: "Fanis Tharropoulos",
  role: "Software Engineer",
  intro:
    "Hey, I'm Fanis, a software engineer living in Athens, Greece. This is where I share projects, experiences, and things I'm excited about.",
  photo: {
    src: "/grad.png",
    alt: "Graduation day",
    caption: "Graduation day!",
    date: "Dec 20, 2024",
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
  currentProject: {
    name: "Kyma",
    href: "https://kyma.ink",
    repositoryHref: "https://github.com/museslabs/kyma",
    description:
      "(Κῦμα), a TUI presentation tool with a focus on eye candy and ease of use.",
  },
} as const;
