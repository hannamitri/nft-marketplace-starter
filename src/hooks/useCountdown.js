import { useEffect, useState } from "react";

function formatCountdown(remainingMs) {
  if (remainingMs <= 0) return "Ended";
  const totalSec = Math.floor(remainingMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}h ${m}m ${s}s`;
}

/**
 * @param {number} expiryDateMs Unix timestamp in milliseconds
 * @returns {string} Countdown like "5h 30m 32s", or "Ended" when past
 */
export function useCountdown(expiryDateMs) {
  const ts = Number(expiryDateMs);
  const [label, setLabel] = useState(() =>
    Number.isFinite(ts) ? formatCountdown(ts - Date.now()) : "—"
  );

  useEffect(() => {
    if (!Number.isFinite(ts)) {
      setLabel("—");
      return;
    }

    const tick = () => {
      const remaining = ts - Date.now();
      setLabel(formatCountdown(remaining));
      return remaining <= 0;
    };

    if (tick()) return;

    const id = setInterval(() => {
      if (tick()) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [ts]);

  return label;
}
