import type { RestEndpointMethodTypes } from "@octokit/rest";

import { Octokit } from "@octokit/rest";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { motion, MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";

type SearchItem =
  RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"]["data"]["items"][number];

const octokit = new Octokit();
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10 * 60 * 1000, retry: 1 } },
});

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

// Solid blocks in the page's own colors: shipped in ink, in flight in teal. PRs closed
// without merging stay off the list, since on a front page they read as rejected.
const stateStyles = {
  merged: "bg-ink text-paper",
  open: "bg-teal-ink text-paper",
};
type State = keyof typeof stateStyles;

const skeletonWidths = [72, 58, 80, 44, 64];

// The row's parts, shared with the skeleton so both come out the same height.
const row = "relative isolate border-t-hairline border-ink first:border-t-0";
const body =
  "-mx-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 px-4 py-3.5";
const badge =
  "mt-0.5 self-start px-1.5 pb-0.5 pt-[3px] font-dm-mono text-badge leading-[1.2]";
const repo =
  "order-3 basis-full font-dm-mono text-meta tabular-nums text-ink-3 min-[700px]:order-1 min-[700px]:basis-auto";
const date =
  "order-1 ml-auto whitespace-nowrap font-dm-mono text-meta tabular-nums text-ink-3 min-[700px]:order-2";
const title =
  "order-2 mt-1.5 basis-full text-pretty text-body-lg font-[520] min-[700px]:order-3";
const bone = "bg-ink/[0.08] text-transparent";

function stateOf(pr: SearchItem): State | null {
  if (pr.pull_request?.merged_at) return "merged";
  return pr.state === "open" ? "open" : null;
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
        // Spares for the closed ones dropped below.
        per_page: count * 2,
      });
      return data.items
        .flatMap((pr) => {
          const state = stateOf(pr);
          return state ? [{ pr, state }] : [];
        })
        .slice(0, count);
    },
  });

  if (isError) {
    return (
      <p className="py-[18px] text-ink-2">
        Couldn't load pull requests right now.{" "}
        <a
          href={`https://github.com/pulls?q=author%3A${username}+is%3Apr`}
          className="underline decoration-[1.5px] underline-offset-[0.2em]"
        >
          See them on GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <ul aria-busy={isPending}>
      {isPending ?
        Array.from({ length: count }, (_, i) => (
          <SkeletonRow
            key={i}
            width={skeletonWidths[i % skeletonWidths.length]}
          />
        ))
      : prs.map(({ pr, state }, i) => (
          <PullRequestRow key={pr.id} pr={pr} state={state} index={i} />
        ))
      }
    </ul>
  );
}

// The row with its text hidden behind blocks. The title takes two lines on phones, where
// most titles wrap, and one above.
function SkeletonRow({ width }: { width: number }) {
  return (
    <li className={cn(row, "select-none")} aria-hidden="true">
      <div className={body}>
        <span className={cn(badge, bone)}>merged</span>
        <span className={repo}>
          <span className={bone}>typesense/typesense #0000</span>
        </span>
        <span className={date}>
          <span className={bone}>Nov 4, 2026</span>
        </span>
        <span
          className={cn(
            title,
            "flex h-[2lh] flex-col justify-evenly min-[700px]:h-[1lh]",
          )}
        >
          <span
            className="h-[0.8em] bg-ink/[0.08]"
            style={{ width: `${width}%` }}
          />
          <span className="h-[0.8em] w-2/5 bg-ink/[0.08] min-[700px]:hidden" />
        </span>
      </div>
    </li>
  );
}

// State and repo share a line with the date, then the title. On phones the repo can't
// fit beside the date: state and date first, then the title, then the repo.
function PullRequestRow({
  pr,
  state,
  index,
}: {
  pr: SearchItem;
  state: State;
  index: number;
}) {
  return (
    <motion.li
      className={row}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0,
        visualDuration: 0.2,
        delay: index * 0.04,
      }}
    >
      <a
        href={pr.html_url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          body,
          "transition-colors duration-150 ease-out hover:bg-wash active:bg-wash",
        )}
      >
        <span className={cn(badge, stateStyles[state])}>{state}</span>
        <span className={repo}>
          {repoOf(pr)} #{pr.number}
        </span>
        <time className={date} dateTime={pr.created_at}>
          {dateFormat.format(new Date(pr.created_at))}
        </time>
        <span className={title}>{pr.title}</span>
      </a>
    </motion.li>
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
