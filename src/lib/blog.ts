import { getCollection, render } from "astro:content";

import { externalPosts } from "@/data/external-posts";

export async function getPublishedBlogPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

export type Writing = {
  title: string;
  description: string;
  date: Date;
  href: string;
  tags: string[];
  minutesRead?: string;
  /** The site it was published on, when that isn't this one. */
  venue?: string;
};

// The posts here and the ones published elsewhere, newest first.
export async function getWriting(): Promise<Writing[]> {
  const posts = await Promise.all(
    (await getPublishedBlogPosts()).map(async (post) => {
      const { remarkPluginFrontmatter } = await render(post);
      return {
        title: post.data.title,
        description: post.data.description,
        date: post.data.publishedAt,
        href: `/blog/${post.id}/`,
        tags: post.data.tags,
        minutesRead: remarkPluginFrontmatter.minutesRead as string | undefined,
      };
    }),
  );

  return [...posts, ...externalPosts].sort(
    (left, right) => right.date.getTime() - left.date.getTime(),
  );
}

export function formatBlogDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
