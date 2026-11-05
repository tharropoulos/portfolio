// The site's pages, in the header and again in the footer. push.ts reads their order
// from the header to pick the push's direction.
export const nav = [
  { href: "/", label: "about" },
  { href: "/work", label: "work" },
  { href: "/blog", label: "writing" },
];

// Whether a path is under one of them, like a post under writing.
export const within = (href: string, path: string) =>
  href !== "/" && path.startsWith(`${href}/`);
