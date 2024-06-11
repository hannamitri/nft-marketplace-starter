import React, { useEffect, useState } from "react";

const Timer = ({ item }) => {
  const [countdown, setCountdown] = useState(item);

  const calculateTimeRemaining = () => {
    const millisLeft = new Date(countdown.expiryDate) - Date.now();
    const secondsLeft = Math.floor(millisLeft / 1000) % 60;
    const minutesLeft = Math.floor(millisLeft / (1000 * 60)) % 60;
    const hoursLeft = Math.floor(millisLeft / (1000 * 60 * 60));
    const displayTimer = millisLeft > 0;

    setCountdown((prevCountdown) => ({
      ...prevCountdown,
      countdown: `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`,
      displayTimer,
    }));
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{countdown.displayTimer && <>{countdown.countdown}</>}</>;
};

export default Timer;
