"use client";

import { useEffect, useState } from "react";

const MOBILE_NAV_MQ = "(max-width: 1023px)";

/** True below lg breakpoint — orbit deck is desktop-only. */
export function useIsMobileNav(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
