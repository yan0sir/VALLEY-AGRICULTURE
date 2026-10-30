"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "@/i18n/navigation";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Site-wide smooth (inertia) scrolling.
 * - Off for people who ask the system to reduce motion.
 * - Touch devices keep native scrolling (Lenis default), which feels better on phones.
 * - In-page links like "#range" glide to their target, clearing the fixed navbar.
 * The instance is exposed on window.__lenis so menus can pause it (see Header.tsx).
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      anchors: { offset: -(navH() + 16) },
    });
    window.__lenis = lenis;

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  // New page: start at the top immediately instead of gliding from the old position.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
