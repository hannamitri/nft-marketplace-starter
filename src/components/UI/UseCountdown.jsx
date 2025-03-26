import React, { useEffect, useState } from "react";

const UseCountdown = (expiryDate) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date(expiryDate).getTime();

    function updateCountdown() {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance < 0) {
        setTimeLeft("");
        return;
      }
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      setTimeout(updateCountdown, 1000);
    }

    updateCountdown();

    // Cleanup on unmount

    return () => clearTimeout(updateCountdown);
  }, [expiryDate]);
  return timeLeft;
};

export default UseCountdown;
