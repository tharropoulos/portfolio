// The push between pages that open on a title cell. The new title pushes the old one
// out, the cell takes the new title's height, and the page below rides on its bottom
// edge. Heading right in the nav pushes up, heading left pushes down. A post sits just
// right of its index.
//
// The view-transition names only exist while <html> carries data-push (see index.css).
// It only runs when the cell is on screen: from further down the page it would fly in
// from above. Every other navigation, and a push that can't play, simply swaps the page,
// with no crossfade.
//
// Snapshots off the pixel grid draw soft and land a fraction off when the live page takes
// over, so everything that moves sits on whole pixels: the header, title cell, based strip
// and contact box by their line heights, and the page by snap() for as long as the push
// runs.
import type {
  TransitionBeforePreparationEvent,
  TransitionBeforeSwapEvent,
} from "astro:transitions/client";

const root = document.documentElement;
const cell = () => document.querySelector<HTMLElement>(".push-hero");
const path = (url: URL) => url.pathname.replace(/\/$/, "") || "/";
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const page = () => document.querySelector<HTMLElement>(".push-page");

// Rounds the page's height up to a whole device pixel, since the browser would stretch a
// fractional snapshot to fit.
function snap() {
  const el = page();
  if (!el) return;
  const dpr = devicePixelRatio;
  el.style.minHeight = `${Math.ceil(el.getBoundingClientRect().height * dpr) / dpr}px`;
}

// Where a page sits in the nav. A post sits halfway past its index, so opening one pushes
// up and leaving it for the index, or anywhere left of it, pushes down.
function rank(nav: string[], to: string) {
  const i = nav.indexOf(to);
  if (i !== -1) return i;
  return nav.findIndex((n) => n !== "/" && to.startsWith(`${n}/`)) + 0.5;
}

function end() {
  delete root.dataset.push;
  delete root.dataset.pushContact;
}

// The old cell's height, for pushing up: the new title starts right below the old one.
let fromHeight = 0;
// The push under way, so it can still be called off once the new page is in place.
let pushing: ViewTransition | undefined;

document.addEventListener("astro:before-preparation", (e) => {
  const event = e as TransitionBeforePreparationEvent;
  const load = event.loader;
  end();
  // The old page is captured right after loading, so the call is made here, once the new
  // page is known to have a cell too.
  event.loader = async () => {
    await load();
    const rect = cell()?.getBoundingClientRect();
    const [from, to] = [path(event.from), path(event.to)];
    if (
      !rect ||
      rect.bottom <= 0 ||
      from === to ||
      reduce.matches ||
      !event.newDocument.querySelector(".push-hero")
    )
      return;
    const nav = [
      ...document.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Primary"] a',
      ),
    ].map((a) => path(new URL(a.href)));
    root.dataset.push = rank(nav, to) < rank(nav, from) ? "down" : "up";
    // Posts have no masthead, so no based strip or contact box. Ones only the old or the
    // new page has are left to the root's crossfade, under the cell, so the cell grows
    // over them or shrinks off them. With names of their own they'd be drawn over the
    // titles.
    if (
      document.querySelector(".push-contact") &&
      event.newDocument.querySelector(".push-contact")
    )
      root.dataset.pushContact = "";
    fromHeight = rect.height;
    snap();
  };
});

document.addEventListener("astro:before-swap", (e) => {
  const event = e as TransitionBeforeSwapEvent;
  const dir = root.dataset.push;
  // Without a push the new page simply replaces the old one. So it does in Safari's
  // swipe-back and in browsers without view transitions, which get Astro's stand-in: it
  // has no pseudo-elements to push.
  if (
    !dir ||
    !(
      "ViewTransition" in window &&
      event.viewTransition instanceof ViewTransition
    )
  ) {
    end();
    event.viewTransition.skipTransition();
    return;
  }
  pushing = event.viewTransition;
  // Astro replaces <html>'s attributes on swap.
  const html = event.newDocument.documentElement;
  html.dataset.push = dir;
  if ("pushContact" in root.dataset) html.dataset.pushContact = "";
  event.newDocument
    .querySelector(".push-hero")
    ?.setAttribute("data-arrived", "");
  let slides: Animation[] = [];
  event.viewTransition.ready
    .then(() => (slides = push(dir === "up")))
    .catch(() => {});
  // The slides hold their last frame, so they'd outlive their pseudo-elements, a pair
  // for every push.
  event.viewTransition.finished.finally(() => {
    end();
    page()?.style.removeProperty("min-height");
    slides.forEach((slide) => slide.cancel());
  });
});

// A back or forward restores the scroll, which can leave the new cell off screen. The
// push is called off then, and the new page simply replaces the old one. Left to run
// without it, the old page's cell would hang over the new one until the transition ended.
document.addEventListener("astro:after-swap", () => {
  if (!root.dataset.push) return;
  const rect = cell()?.getBoundingClientRect();
  if (rect && rect.bottom > 0) {
    snap();
    return;
  }
  end();
  pushing?.skipTransition();
});

// The cell's size and the page's travel are the browser's own group animations, timed in
// index.css. The two titles move as one strip, so the one coming in always starts flush
// against the one going out.
function push(up: boolean) {
  if (!root.dataset.push) return [];
  const style = getComputedStyle(root);
  // The build's minifier writes 400ms as .4s.
  const duration = style.getPropertyValue("--push-duration").trim();
  const timing = {
    duration: parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000),
    easing: style.getPropertyValue("--push-ease"),
    fill: "both",
  } as const;
  const toHeight = cell()?.getBoundingClientRect().height ?? 0;
  const shift = up ? -fromHeight : toHeight;
  return [
    root.animate(
      [{ transform: "none" }, { transform: `translateY(${shift}px)` }],
      {
        ...timing,
        pseudoElement: "::view-transition-old(hero)",
      },
    ),
    root.animate(
      [{ transform: `translateY(${-shift}px)` }, { transform: "none" }],
      {
        ...timing,
        pseudoElement: "::view-transition-new(hero)",
      },
    ),
  ];
}
