export interface Experience {
  title: string;
  company: string;
  timeframe: string;
  description: string[];
  skills?: string[];
}
export const school = [
  {
    title: "MSc, Electrical & Computer Engineering",
    company: "Aristotle University of Thessaloniki",
    timeframe: "Dec 2018 - Dec 2024",
    description: [
      "I completed a program of 51 courses (316 ECTS credits) spanning a diverse range of disciplines. It wasn't just about coding or circuits - I dove into everything from cutting-edge Machine Learning and Software Engineering to the fundamental mechanics of Computer Architecture and Database Design. The program stretched well beyond traditional computing into electrical engineering with Power Systems and Electromagnetic Fields, plus nuclear technology, robotics, optimization techniques, and dynamic programming. It was a comprehensive journey through the entire spectrum of modern engineering. From writing algorithms to understanding how power grids and electromagnetic radiation work.",
      "My thesis \"Evaluating source code generated by LLMs and improving the prompt engineering process\" focused on analyzing and enhancing AI code assistants' performance. focused on GitHub Copilot's performance and built a full-stack app called Backlogged using the T3 stack to collect and analyze different coding prompts across various development scenarios.",
    ],
  },
] as const satisfies Experience[];

export const experiences = [
  {
    title: "Software Engineer",
    company: "Typesense",
    timeframe: "June 2024 - Present",
    description: [
      "I maintain and develop language clients across multiple programming languages and contribute to the core search engine. I also maintain other packages in the Typesense ecosystem including the web scraper, InstantSearch adapter, and Firestore extension. My role includes implementing new features, building demos and documentation, and supporting users through Slack, GitHub, and customer meetings. I focus on ensuring cross-platform compatibility and providing clear examples to help users integrate Typesense effectively.",
    ],
    skills: [
      "Typescript",
      "PHP",
      "Java",
      "C++",
      "Ruby",
      "Python",
      "Vitest",
      "OpenAI",
      "Webpack",
      "Esbuild",
      "Docker",
      "Node.js",
      "Deno",
      "Documentation",
      "Vue",
      "Redis",
      "CI/CD",
      "Firestore",
    ],
  },
  {
    title: "Software Engineer in Test",
    company: "Netcompany-Intrasoft",
    timeframe: "Feb 2024 - June 2024",
    description: [
      "Developed an automated testing framework in TypeScript using WebdriverIO. I built a type-safe testing skeleton that enabled other testers to create automated tests efficiently, leading the project's transition from Java and Selenium. The framework focused on developer experience and ease of use, making it simpler for the team to implement reliable automated tests. When the opportunity to work on open source arose, I had to move on.",
    ],
    skills: [
      "Typescript",
      "Java",
      "Selenium",
      "WebdriverIO",
      "Playwright",
      "CI/CD",
      "Docker",
      "AWS",
      "Jenkins",
    ],
  },
  {
    title: "Software Engineer",
    company: "ENA Media Group",
    timeframe: "May 2023 - Oct 2023  · Contract",
    description: [
      "I helped build a real-time web interface for displaying the 2023 Greek national and regional election results on live television. As part of a two-person team, I developed animated visualizations, comparison cards, and dynamic displays using Django and HTMX. The system pulled live election data through automated cron jobs, ensuring up-to-the-minute accuracy during broadcast, with instant updates reflected on air.",
    ],
    skills: [
      "Python",
      "Typescript",
      "Django",
      "HTMX",
      "TailwindCSS",
      "CI/CD",
      "Fly.io",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "Vertitech",
    timeframe:
      "July 2022 - Sept 2022 · Internship / Oct 2022 - Jan 2023 · Full-time",
    description: [
      "I helped develop a blockchain-based academic certificate issuance and validation system. Working in a two-person team, I built the web application using ASP.NET Core, integrating with the Dock API for blockchain operations. The system enables educational institutions to securely issue and verify academic credentials on the blockchain. I concluded my role to focus on completing my university studies.",
    ],
    skills: ["C#", ".NET", "Web3", "Bootstrap", "Azure", "Razor", "Javascript"],
  },
] as const satisfies Experience[];
