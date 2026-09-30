"use client";

/**
 * Anchor navigation with a scroll tween we control.
 *
 * Why not `scroll-behavior: smooth` plus native fragment scrolling:
 * that combination depends entirely on the browser honouring a CSS-driven
 * smooth scroll, and it does not always happen — it was verified failing
 * outright in a Chromium run where `scrollTo` reported no movement at all
 * while the same call with `behavior: "instant"` worked. A navigation bar
 * that silently does nothing is worse than one that jumps.
 *
 * Driving it with requestAnimationFrame means the destination is guaranteed:
 * we always write the final offset ourselves, so the scroll lands even where
 * the native animation never starts. It also lets the motion use the site's
 * own easing curve and duration budget instead of the browser default.
 */

const DURATION = 520;
const MIN_DISTANCE = 2;

/** easeOutExpo — fast departure, long settle. Matches --ease-out-expo. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Distance-proportional duration, clamped, so a short hop stays quick. */
function durationFor(distance: number) {
  return Math.max(180, Math.min(DURATION, distance * 0.35));
}

let frame = 0;
let cancelCurrent: (() => void) | null = null;

export function cancelScroll() {
  cancelCurrent?.();
}

/**
 * Scrolls an element into view beneath the sticky header.
 * Returns false when the id does not exist.
 */
export function scrollToSection(id: string, updateHash = true) {
  cancelScroll();

  const el = document.getElementById(id);
  if (!el) return false;

  // Read the same padding the stylesheet uses so the heading clears the
  // header. Two sources of truth for this offset is how the active pill ends
  // up highlighting the section above the one actually shown.
  const padding = parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop,
  );
  const offset = Number.isFinite(padding) ? padding : 96;

  const start = window.scrollY;
  const target = Math.max(
    0,
    Math.min(
      el.getBoundingClientRect().top + start - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );

  if (updateHash) {
    // replaceState, not a hash assignment: assigning the hash would trigger a
    // second native scroll on top of this one.
    window.history.replaceState(null, "", `#${id}`);
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || Math.abs(target - start) < MIN_DISTANCE) {
    window.scrollTo(0, target);
    return true;
  }

  const duration = durationFor(Math.abs(target - start));
  const began = performance.now();

  let deadline = 0;

  const finish = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    clearTimeout(deadline);
    cancelCurrent = null;
    // Land on the exact offset regardless of rounding drift.
    window.scrollTo(0, target);
  };

  const step = (now: number) => {
    const elapsed = now - began;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, Math.round(start + (target - start) * easeOutExpo(t)));

    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      finish();
    }
  };

  cancelCurrent = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    clearTimeout(deadline);
    cancelCurrent = null;
  };

  frame = requestAnimationFrame(step);

  // Hard deadline. The tween is frame-driven, so a starved or suspended
  // requestAnimationFrame — background tabs, throttled or headless
  // environments — would otherwise leave the reader short of the section with
  // no way to tell why. Timers keep firing in those cases, so this guarantees
  // the destination is reached. Verified necessary: in a headless run rAF was
  // delivering roughly one frame per second, and without this the navigation
  // appeared not to work at all.
  deadline = window.setTimeout(finish, duration + 140);

  return true;
}

/**
 * Wires an element's hash links to the tween, leaving real cross-page
 * navigation to the browser.
 */
export function useAnchoredLinks() {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("/#")) return;

    const id = href.slice(2);
    // Modifier-clicks mean "open in a new tab", which native anchors handle.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    scrollToSection(id);
  };
}