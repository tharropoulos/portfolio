import { getCollection, render } from "astro:content";

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
};

export async function getWriting(): Promise<Writing[]> {
  return Promise.all(
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
}

export function formatBlogDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
