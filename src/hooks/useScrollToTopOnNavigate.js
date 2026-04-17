import { useEffect } from "react";

const isReloadNavigation = () => {
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  return navigationEntry?.type === "reload" || performance.navigation?.type === 1;
};

const useScrollToTopOnNavigate = () => {
  useEffect(() => {
    if (!isReloadNavigation()) {
      window.scrollTo(0, 0);
    }
  }, []);
};

export default useScrollToTopOnNavigate;
