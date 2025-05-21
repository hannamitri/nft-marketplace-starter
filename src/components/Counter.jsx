import React, { useEffect, useState } from "react";

const Counter = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const formatTime = (ms) => {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(0, new Date(expiryDate).getTime() - now);
      setTimeLeft(remaining > 0 ? formatTime(remaining) : "Expired");
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  return timeLeft === "Expired" ? null : (
  <div className="de_countdown">{timeLeft}</div>
  );
};

export default Counter;
