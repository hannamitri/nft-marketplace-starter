import { useEffect, useRef, useState } from "react";

const useMinimumLoading = (isLoading, minimumDuration = 700) => {
  const [visibleLoading, setVisibleLoading] = useState(isLoading);
  const loadingStartedAt = useRef(Date.now());

  useEffect(() => {
    if (isLoading) {
      loadingStartedAt.current = Date.now();
      setVisibleLoading(true);
      return;
    }

    const elapsed = Date.now() - loadingStartedAt.current;
    const remainingTime = Math.max(minimumDuration - elapsed, 0);
    const timer = setTimeout(() => {
      setVisibleLoading(false);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [isLoading, minimumDuration]);

  return visibleLoading;
};

export default useMinimumLoading;