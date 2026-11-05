import path from "node:path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  site: "https://tharropoulos.dev",
  output: "static",
  redirects: {
    "/experience": "/work",
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    mdx(),
    react(),
    // The pages themselves only: the retro copies point at them, and /experience redirects.
    sitemap({ filter: (page) => !/^\/(retro|experience)\//.test(new URL(page).pathname) }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
