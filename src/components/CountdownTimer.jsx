import React from "react";
import { useState, useEffect } from "react";

export default function CountdownTimer({ expiryDate }) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const remaining = expiryDate - now;
      setTimeRemaining(remaining > 0 ? remaining : 0);

      if (remaining <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  if (!expiryDate) return null;
  if (timeRemaining <= 0) return <p>Expired</p>;

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <p>
      {hours}h {minutes}m {seconds}s
    </p>
  );
};

