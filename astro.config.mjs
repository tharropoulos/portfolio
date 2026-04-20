import path from "node:path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  output: "static",
  integrations: [mdx(), react()],
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
