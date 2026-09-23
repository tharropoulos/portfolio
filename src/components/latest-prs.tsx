import type { RestEndpointMethodTypes } from "@octokit/rest";

import { Octokit } from "@octokit/rest";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SearchItem =
  RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"]["data"]["items"][number];

const octokit = new Octokit();
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10 * 60 * 1000, retry: 1 } },
});

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

const stateStyles = {
  open: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  merged: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  closed: "bg-red-500/15 text-red-700 dark:text-red-300",
};

function stateOf(pr: SearchItem): keyof typeof stateStyles {
  if (pr.pull_request?.merged_at) return "merged";
  return pr.state === "open" ? "open" : "closed";
}

function repoOf(pr: SearchItem) {
  return new URL(pr.repository_url).pathname.replace("/repos/", "");
}

function PullRequestList({
  username,
  count,
}: {
  username: string;
  count: number;
}) {
  const {
    data: prs,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["latest-prs", username, count],
    queryFn: async () => {
      const { data } = await octokit.rest.search.issuesAndPullRequests({
        q: `author:${username} type:pr is:public`,
        sort: "created",
        order: "desc",
        per_page: count,
      });
      return data.items;
    },
  });

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground md:text-base">
        Couldn't load pull requests right now.{" "}
        <a
          href={`https://github.com/pulls?q=author%3A${username}+is%3Apr`}
          className="font-extrabold text-teal-600 hover:underline dark:text-teal-300"
        >
          See them on GitHub
        </a>
        .
      </p>
    );
  }

  const rows = isPending ? Array.from({ length: count }, () => null) : prs;

  return (
    <ul className="flex flex-col" aria-busy={isPending}>
      {rows.map((pr, index) => (
        <li
          key={index}
          className="border-b border-muted py-4 first:pt-0 last:border-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            {pr ?
              <PullRequestRow key={pr.id} pr={pr} index={index} />
            : <motion.div
                key="skeleton"
                className="flex flex-col gap-2"
                exit={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                transition={{ duration: 0.15, delay: index * 0.07 }}
              >
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </motion.div>
            }
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

function PullRequestRow({ pr, index }: { pr: SearchItem; index: number }) {
  const state = stateOf(pr);
  return (
    <motion.a
      href={pr.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-1"
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
    >
      <span className="text-sm font-semibold leading-6 transition-colors duration-200 group-hover:text-teal-600 dark:text-zinc-200 dark:group-hover:text-teal-300 md:text-base">
        {pr.title}
      </span>
      <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-sm">
        <motion.span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            stateStyles[state],
          )}
          initial={{ scale: 0, rotate: -4 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.5,
            delay: 0.15 + index * 0.03,
          }}
        >
          {state}
        </motion.span>
        <span>
          {repoOf(pr)} #{pr.number}
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={pr.created_at}>
          {dateFormat.format(new Date(pr.created_at))}
        </time>
      </span>
    </motion.a>
  );
}

// Each Astro island is its own React root, so the provider lives here.
export function LatestPullRequests({
  username,
  count = 5,
}: {
  username: string;
  count?: number;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <PullRequestList username={username} count={count} />
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default LatestPullRequests;
