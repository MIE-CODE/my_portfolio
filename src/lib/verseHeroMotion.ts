import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";

/** Home hero enter sequence — warp / HUD style */
export function runVerseHeroEnter(root: HTMLElement) {
  const xpBar = root.querySelector("[data-hero-xp]");
  const title = root.querySelector("[data-hero-title]");
  const stats = root.querySelector("[data-hero-stats]");
  const buttons = root.querySelector("[data-hero-actions]");
  const achievements = root.querySelector("[data-hero-achievements]");
  const keyboard = root.querySelector("[data-hero-keyboard]");

  const blocks = [xpBar, title, keyboard].filter(Boolean) as Element[];
  gsap.set(blocks, { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: VERSE_EASE.hud } });

  if (xpBar) {
    tl.fromTo(
      xpBar,
      { opacity: 0, y: -36, scale: 0.88, filter: "blur(4px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 },
      0,
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 48, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85 },
      0.15,
    );
  }

  if (stats) {
    const statCards = stats.querySelectorAll("[data-hero-stat]");
    gsap.set(stats, { opacity: 0 });
    tl.fromTo(
      stats,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.45 },
      0.48,
    );
    if (statCards.length > 0) {
      gsap.set(statCards, { opacity: 0 });
      tl.fromTo(
        statCards,
        { opacity: 0, y: 28, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1 },
        0.52,
      );
    }
  }

  if (buttons) {
    tl.fromTo(
      buttons.children,
      { opacity: 0, y: 28, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: VERSE_EASE.snap,
      },
      0.65,
    );
  }

  if (achievements) {
    const badges = achievements.querySelectorAll("[data-hero-badge]");
    gsap.set(achievements, { opacity: 0 });
    tl.fromTo(
      achievements,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.88,
    );
    if (badges.length > 0) {
      gsap.set(badges, { opacity: 0 });
      tl.fromTo(
        badges,
        { opacity: 0, y: 24, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07 },
        0.92,
      );
    }
  }

  if (keyboard) {
    tl.fromTo(
      keyboard,
      { opacity: 0, y: 56, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9 },
      1.05,
    );
  }

  tl.eventCallback("onComplete", () => {
    const visible = root.querySelectorAll(
      "[data-hero-xp], [data-hero-title], [data-hero-stats], [data-hero-achievements], [data-hero-keyboard], [data-hero-actions] > *, [data-hero-stat], [data-hero-badge], #skills [data-stack-item]",
    );
    gsap.set(visible, { opacity: 1, clearProps: "transform,filter" });
  });

  return tl;
}
