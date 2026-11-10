import rss from "@astrojs/rss";

import { getWriting } from "@/lib/blog";

export async function GET() {
  const posts = await getWriting();

  return rss({
    title: "Writing | Fanis Tharropoulos",
    description: "Notes on software engineering, open source, and developer tooling.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: post.href,
      categories: post.tags,
    })),
  });
}
