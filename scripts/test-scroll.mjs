/**
 * Verifies native document scrolling (no overflow lock, scrollHeight > viewport).
 * Run: node scripts/test-scroll.mjs [baseUrl]
 */
const base = process.argv[2] ?? "http://localhost:3000";

async function main() {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  try {
    await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2500);

    const before = await page.evaluate(() => ({
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      bodyOverflow: getComputedStyle(document.body).overflow,
      htmlOverflow: getComputedStyle(document.documentElement).overflow,
      htmlInline: document.documentElement.style.overflow,
      bodyInline: document.body.style.overflow,
      scrollLocked: document.documentElement.classList.contains("scroll-locked"),
      splash: !!document.querySelector(".app-splash"),
    }));

    if (before.splash) {
      await page.waitForFunction(() => !document.querySelector(".app-splash"), {
        timeout: 20000,
      });
      await page.waitForTimeout(500);
    }

    const ready = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      scrollLocked: document.documentElement.classList.contains("scroll-locked"),
      bodyInline: document.body.style.overflow,
    }));

    const canScroll = ready.scrollHeight > ready.clientHeight + 80;
    if (!canScroll) {
      throw new Error(
        `Page not tall enough to scroll: ${ready.scrollHeight} vs ${ready.clientHeight}`,
      );
    }
    if (ready.scrollLocked || ready.bodyInline) {
      throw new Error(
        `Scroll still locked: class=${ready.scrollLocked} bodyInline=${ready.bodyInline}`,
      );
    }

    await page.evaluate(() => window.scrollTo(0, 480));
    await page.waitForTimeout(200);
    const y1 = await page.evaluate(() => window.scrollY);

    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(200);
    const y2 = await page.evaluate(() => window.scrollY);

    await page.keyboard.press("PageDown");
    await page.waitForTimeout(200);
    const y3 = await page.evaluate(() => window.scrollY);

    if (y1 < 100 && y2 < 100 && y3 < 100) {
      throw new Error(`Scroll did not move: y1=${y1} y2=${y2} y3=${y3}`);
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          scrollHeight: ready.scrollHeight,
          clientHeight: ready.clientHeight,
          scrollPositions: { y1, y2, y3 },
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("SCROLL TEST FAILED:", err.message);
  process.exit(1);
});
