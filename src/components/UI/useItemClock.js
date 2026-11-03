import { useEffect, useState } from "react";

// One clock per section, shared by cards and carousel clones.
export default function useItemClock(items) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => setNow(Date.now()), [items]);
  const hasActiveCountdown = items.some(
    (item) => item.expiryDate !== null && item.expiryDate > now
  );
  useEffect(() => {
    if (!hasActiveCountdown) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [hasActiveCountdown]);
  return now;
}
