import React, { useEffect, useState } from "react";

function Countdown({ item }) {
  const calculateTimeLeft = () => {
    const now = Date.now();
    const expiryTime = new Date(item.expiryDate).getTime();
    const timeLeft = expiryTime - now;
    return timeLeft > 0 ? timeLeft : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item.expiryDate]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="de_countdown">
      {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
    </div>
  );
}

export default Countdown;
