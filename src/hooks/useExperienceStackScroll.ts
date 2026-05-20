"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PIN_TOP = 100;
const TRAIL_TOP = 24;
const CARD_GAP = 26;
const PEEK_STRIDE = CARD_GAP + 56;

function measureMaxPanelHeight(cards: HTMLElement[]) {
  let max = 320;
  for (const card of cards) {
    const panel = card.querySelector<HTMLElement>("[data-stack-panel]");
    if (panel) panel.style.height = "";
    const h = panel?.offsetHeight ?? card.offsetHeight;
    if (h > max) max = h;
  }
  return max;
}

function applyUniformCardHeights(
  cards: HTMLElement[],
  section: HTMLElement,
  height: number,
) {
  section.style.setProperty("--experience-card-h", `${height}px`);
  for (const card of cards) {
    const panel = card.querySelector<HTMLElement>("[data-stack-panel]");
    if (panel) panel.style.height = `${height}px`;
  }
}

function clearUniformCardHeights(cards: HTMLElement[], section: HTMLElement) {
  section.style.removeProperty("--experience-card-h");
  for (const card of cards) {
    const panel = card.querySelector<HTMLElement>("[data-stack-panel]");
    if (panel) panel.style.height = "";
  }
}

function measureStaticTrail(pin: HTMLElement, cards: HTMLElement[]) {
  const firstDot = cards[0]?.querySelector<HTMLElement>("[data-stack-dot]");
  const lastDot =
    cards[cards.length - 1]?.querySelector<HTMLElement>("[data-stack-dot]");
  if (!firstDot || !lastDot) return { top: TRAIL_TOP, height: 0 };

  const pinRect = pin.getBoundingClientRect();
  const firstRect = firstDot.getBoundingClientRect();
  const lastRect = lastDot.getBoundingClientRect();
  const top = firstRect.top - pinRect.top + firstRect.height / 2;
  const end = lastRect.top - pinRect.top + lastRect.height / 2;
  return { top, height: Math.max(end - top, 8) };
}

function layoutStaticTrail(
  trail: HTMLElement,
  pin: HTMLElement,
  cards: HTMLElement[],
) {
  const { top, height } = measureStaticTrail(pin, cards);
  gsap.set(trail, { top, height, scaleY: 1, transformOrigin: "top center" });
}

function measureVirtualTrailSpan(cardCount: number, uniformH: number) {
  const dotCenter = (y: number) => y + 24 + 8;
  const firstDotCenter = dotCenter(0);
  const lastY = (cardCount - 1) * (uniformH + CARD_GAP);
  const lastDotCenter = dotCenter(lastY);

  return {
    top: firstDotCenter,
    height: Math.max(lastDotCenter - firstDotCenter, 24),
  };
}

function scaleForProgress(min: number, max: number, p: number) {
  if (max <= 0) return 1;
  return min / max + (1 - min / max) * (1 - p);
}

type StackCache = {
  stageH: number;
  trailTop: number;
  maxTrailH: number;
  trailEndScale: number;
  steps: number;
  sectionHeights: number[];
  cardFromY: number[];
  zByStep: number[][];
};

function stackedCountBefore(index: number, p: number, steps: number) {
  let count = 0;
  for (let j = 1; j < index; j++) {
    if (p >= j / steps) count++;
  }
  return count;
}

function waitingY(index: number, p: number, cache: Pick<StackCache, "stageH" | "steps">) {
  const queuePos = index - 1 - stackedCountBefore(index, p, cache.steps);
  return cache.stageH + CARD_GAP + Math.max(0, queuePos) * PEEK_STRIDE;
}

function sectionHeightAt(p: number, cardCount: number, cache: StackCache) {
  let maxBottom = cache.stageH;
  for (let i = 0; i < cardCount; i++) {
    let y = 0;
    if (i > 0) {
      const stepStart = (i - 1) / cache.steps;
      const stepEnd = i / cache.steps;
      if (p >= stepEnd) y = 0;
      else if (p <= stepStart) y = waitingY(i, p, cache);
      else {
        const local = (p - stepStart) / (stepEnd - stepStart);
        y = waitingY(i, stepStart, cache) * (1 - local);
      }
    }
    maxBottom = Math.max(maxBottom, y + cache.stageH);
  }
  return Math.round(maxBottom + CARD_GAP);
}

function zIndexAt(
  step: number,
  cardIndex: number,
  steps: number,
  cardCount: number,
) {
  if (cardIndex === 0) return 1;
  if (step < steps && cardIndex === step + 1) return 50;
  if (cardIndex <= step) return 10 + cardIndex;
  return cardCount - cardIndex + 10;
}

function buildZTable(steps: number, cardCount: number) {
  const table: number[][] = [];
  for (let s = 0; s <= steps; s++) {
    const row: number[] = [];
    for (let i = 0; i < cardCount; i++) {
      row.push(zIndexAt(s, i, steps, cardCount));
    }
    table.push(row);
  }
  return table;
}

/**
 * Scroll-driven stack — GSAP timeline + transform pin; layout batched per scroll step.
 */
export function useExperienceStackScroll(
  workBlockRef: RefObject<HTMLElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  trailRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const workBlock = workBlockRef.current;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const trail = trailRef.current;
    if (!workBlock || !section || !pin || !stage || !trail) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", pin);
    if (cards.length === 0) return;

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;

    const resetTrail = () => {
      gsap.set(trail, { clearProps: "top,height,transform" });
    };

    const setStatic = () => {
      section.classList.add("experience-stack--static");
      section.classList.remove("experience-stack--ready");
      gsap.set(cards, { clearProps: "all" });
      stage.style.height = "";
      stage.style.minHeight = "";
      section.style.height = "";
      section.style.minHeight = "";
      const h = measureMaxPanelHeight(cards);
      applyUniformCardHeights(cards, section, h);
      layoutStaticTrail(trail, pin, cards);
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
      setStatic();
      return () => {
        section.classList.remove("experience-stack--static");
        clearUniformCardHeights(cards, section);
        resetTrail();
      };
    });

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        section.classList.remove("experience-stack--static");
        html.style.scrollBehavior = "auto";

        const cache: StackCache = {
          stageH: 320,
          trailTop: TRAIL_TOP,
          maxTrailH: 24,
          trailEndScale: 1,
          steps: Math.max(cards.length - 1, 1),
          sectionHeights: [],
          cardFromY: [],
          zByStep: [],
        };

        let stackTrigger: ScrollTrigger | null = null;
        let lastZStep = -1;
        let lastSectionHeight = -1;

        const layout = () => {
          const h = measureMaxPanelHeight(cards);
          applyUniformCardHeights(cards, section, h);
          stage.style.height = `${h}px`;
          cache.stageH = h;
        };

        const rebuildCache = () => {
          layout();
          const trailMetrics = measureVirtualTrailSpan(
            cards.length,
            cache.stageH,
          );
          cache.trailTop = trailMetrics.top;
          cache.maxTrailH = trailMetrics.height;
          const minTrailH = Math.max(cache.stageH - cache.trailTop, 32);
          cache.trailEndScale = scaleForProgress(
            minTrailH,
            cache.maxTrailH,
            1,
          );

          cache.sectionHeights = [];
          for (let s = 0; s <= cache.steps; s++) {
            cache.sectionHeights.push(
              sectionHeightAt(s / cache.steps, cards.length, cache),
            );
          }

          cache.cardFromY = cards.map((_, i) =>
            i === 0 ? 0 : waitingY(i, (i - 1) / cache.steps, cache),
          );
          cache.zByStep = buildZTable(cache.steps, cards.length);
        };

        const applyZStep = (step: number) => {
          const row = cache.zByStep[step];
          if (!row) return;
          for (let i = 0; i < cards.length; i++) {
            cards[i].style.zIndex = String(row[i]);
          }
        };

        const applyScrollProgress = (progress: number) => {
          const scaled = progress * cache.steps;
          const step = Math.min(Math.floor(scaled + 1e-4), cache.steps);
          const frac = scaled - step;
          const h0 = cache.sectionHeights[step] ?? cache.stageH;
          const h1 =
            cache.sectionHeights[Math.min(step + 1, cache.steps)] ?? h0;
          const h = Math.round(h0 + (h1 - h0) * frac);

          if (h !== lastSectionHeight) {
            lastSectionHeight = h;
            section.style.height = `${h}px`;
          }

          if (step !== lastZStep) {
            lastZStep = step;
            applyZStep(step);
          }
        };

        const setInitialState = () => {
          gsap.set(trail, {
            top: cache.trailTop,
            height: cache.maxTrailH,
            scaleY: 1,
            transformOrigin: "top center",
          });
          gsap.set(cards[0], { y: 0 });
          for (let i = 1; i < cards.length; i++) {
            gsap.set(cards[i], {
              y: waitingY(i, 0, cache),
              opacity: 1,
            });
          }
          lastZStep = -1;
          lastSectionHeight = -1;
          applyScrollProgress(0);
        };

        const finalizeStack = () => {
          workBlock.classList.add("experience-work-block--done");
          section.style.height = `${cache.stageH}px`;
          gsap.set(trail, { scaleY: cache.trailEndScale });
          const finalRow = cache.zByStep[cache.steps];
          cards.forEach((card, i) => {
            gsap.set(card, {
              y: 0,
              zIndex: finalRow?.[i] ?? 10 + i,
              opacity: i === 0 || i === cards.length - 1 ? 1 : 0,
            });
          });
        };

        const resetStack = () => {
          workBlock.classList.remove(
            "experience-work-block--done",
            "experience-work-block--scrolling",
          );
          delete document.documentElement.dataset.experienceStackActive;
          lastZStep = -1;
          lastSectionHeight = -1;
          setInitialState();
        };

        const ctx = gsap.context(() => {
          rebuildCache();
          setInitialState();

          const vh = window.innerHeight;
          const scrollPerStep = Math.min(vh * 0.3, 360);
          const scrollDistance = cache.steps * scrollPerStep;

          const tl = gsap.timeline({
            defaults: { ease: "power1.out" },
            scrollTrigger: {
              trigger: workBlock,
              start: `top ${PIN_TOP}`,
              end: `+=${scrollDistance}`,
              pin: workBlock,
              pinSpacing: true,
              pinType: "transform",
              anticipatePin: 0,
              scrub: 0.35,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              onEnter: () => {
                workBlock.classList.add("experience-work-block--scrolling");
                document.documentElement.dataset.experienceStackActive = "";
              },
              onEnterBack: () => {
                workBlock.classList.add("experience-work-block--scrolling");
                document.documentElement.dataset.experienceStackActive = "";
              },
              onLeave: () => {
                workBlock.classList.remove("experience-work-block--scrolling");
                delete document.documentElement.dataset.experienceStackActive;
                finalizeStack();
              },
              onLeaveBack: () => {
                workBlock.classList.remove("experience-work-block--scrolling");
                delete document.documentElement.dataset.experienceStackActive;
                resetStack();
              },
              onUpdate: (self) => applyScrollProgress(self.progress),
            },
          });

          stackTrigger = tl.scrollTrigger ?? null;

          tl.to(
            trail,
            { scaleY: cache.trailEndScale, duration: cache.steps, ease: "none" },
            0,
          );

          for (let i = 1; i < cards.length; i++) {
            const stepIndex = i - 1;
            tl.fromTo(
              cards[i],
              { y: cache.cardFromY[i] ?? 0 },
              { y: 0, duration: 1, immediateRender: false },
              stepIndex,
            );
          }

          section.classList.add("experience-stack--ready");
        }, section);

        let resizeTimer: ReturnType<typeof setTimeout> | null = null;
        const onResize = () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            resizeTimer = null;
            rebuildCache();
            lastZStep = -1;
            lastSectionHeight = -1;
            setInitialState();
            stackTrigger?.refresh();
          }, 500);
        };

        const ro = new ResizeObserver(onResize);
        ro.observe(stage);

        return () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          ro.disconnect();
          stackTrigger = null;
          ctx.revert();
          gsap.set(cards, { clearProps: "all" });
          for (const card of cards) card.style.zIndex = "";
          clearUniformCardHeights(cards, section);
          workBlock.classList.remove(
            "experience-work-block--done",
            "experience-work-block--scrolling",
          );
          delete document.documentElement.dataset.experienceStackActive;
          section.style.height = "";
          section.style.minHeight = "";
          section.classList.remove("experience-stack--ready");
          stage.style.height = "";
          stage.style.minHeight = "";
          resetTrail();
          html.style.scrollBehavior = prevScrollBehavior;
        };
      },
    );

    return () => {
      mm.revert();
      html.style.scrollBehavior = prevScrollBehavior;
      section.classList.remove(
        "experience-stack--static",
        "experience-stack--ready",
      );
      resetTrail();
    };
  }, [workBlockRef, sectionRef, pinRef, stageRef, trailRef]);
}
