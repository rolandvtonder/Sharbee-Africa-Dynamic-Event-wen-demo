import Lenis from 'lenis';

/**
 * One rAF loop for the whole site. Lenis advances first, then every
 * scroll-driven component reads its own rect and writes styles directly —
 * nothing here goes through React state, so scrolling never re-renders.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
  }

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Jumps to the top — used on every route change. */
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, {immediate: true, force: true});
  window.scrollTo({top: 0, behavior: 'instant'});
}

/** Freezes the page behind an overlay (the menu, the lightbox). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/** Smooth-scrolls to an element on the current page. */
export function scrollToEl(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, {duration: 1.4});
  else el.scrollIntoView();
}
