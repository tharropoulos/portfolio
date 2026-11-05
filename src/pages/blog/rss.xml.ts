import rss from "@astrojs/rss";

import { getPublishedBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getPublishedBlogPosts();

  return rss({
    title: "Writing | Fanis Tharropoulos",
    description: "Notes on software engineering, open source, and developer tooling.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
