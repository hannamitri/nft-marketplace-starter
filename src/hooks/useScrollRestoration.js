import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollStorageKey = (locationKey) => `app:scroll:${locationKey}`;

/**
 * Restores window scroll on browser back/forward (POP). Scrolls to top on
 * PUSH/REPLACE. Persists scroll per history entry (location.key).
 */
export function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const raw = sessionStorage.getItem(scrollStorageKey(location.key));
      if (raw != null) {
        const y = Number(raw);
        if (!Number.isNaN(y)) {
          window.scrollTo(0, y);
        }
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [location.key, navigationType]);

  useEffect(() => {
    const key = scrollStorageKey(location.key);
    let frame = 0;
    const save = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        sessionStorage.setItem(key, String(window.scrollY));
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      window.removeEventListener("scroll", save);
      if (frame) window.cancelAnimationFrame(frame);
      sessionStorage.setItem(key, String(window.scrollY));
    };
  }, [location.key]);
}
