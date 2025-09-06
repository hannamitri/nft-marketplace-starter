import React, { useEffect, useState } from "react";

function diffParts(endMs) {
  const now = Date.now();
  const diff = Math.max(0, endMs - now);
  const sec = Math.floor(diff / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { diff, h, m, s };
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer({ expiryDate, className = "" }) {
  const end = new Date(expiryDate).getTime();
  const [{ diff, h, m, s }, setTick] = useState(() => diffParts(end));

  useEffect(() => {
    const id = setInterval(() => setTick(diffParts(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  if (!expiryDate) return null;
  if (diff <= 0) return <div className={`de_countdown ${className}`}>Ended</div>;

  return (
    <div className={`de_countdown ${className}`}>
      {pad(h)}h {pad(m)}m {pad(s)}s
    </div>
  );
}