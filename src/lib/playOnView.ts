/** Fire `play` once when `el` enters the viewport — no GSAP ScrollTrigger. */
export function playOnView(
  el: HTMLElement,
  play: () => void,
  options?: {
    rootMargin?: string;
    threshold?: number;
    /** When false, only the observer fires (avoids premature play before layout/scroll). */
    immediate?: boolean;
  },
): () => void {
  if (typeof window === "undefined") return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    play();
    return () => {};
  }

  const rootMargin = options?.rootMargin ?? "0px 0px -8% 0px";
  const threshold = options?.threshold ?? 0.06;
  const immediate = options?.immediate ?? true;

  let played = false;
  const runOnce = () => {
    if (played) return;
    played = true;
    play();
    observer.disconnect();
  };

  const isInView = () => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const [top, right, bottom, left] = parseRootMargin(rootMargin, vh, vw);
    return (
      rect.bottom >= -top &&
      rect.top <= vh + bottom &&
      rect.right >= -left &&
      rect.left <= vw + right
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (played) return;
      if (entries.some((e) => e.isIntersecting)) runOnce();
    },
    { rootMargin, threshold },
  );

  observer.observe(el);

  if (immediate) {
    if (isInView()) runOnce();
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!played && isInView()) runOnce();
      });
    });
  }

  return () => observer.disconnect();
}

function parseRootMargin(margin: string, vh: number, vw: number) {
  const parts = margin.trim().split(/\s+/).map((p, i) => {
    const axis = i === 1 || i === 3 ? vw : vh;
    if (p.endsWith("%")) return (parseFloat(p) / 100) * axis;
    if (p.endsWith("px")) return parseFloat(p);
    return parseFloat(p) || 0;
  });
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0], parts[1], parts[2], parts[3]];
}
