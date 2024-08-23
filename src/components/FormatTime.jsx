import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const formatTime = (timeLeft) => {
    if (timeLeft <= 0) {
      return "Expired";
    }
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return ` ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = expiryDate - now;
      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(0);
        clearInterval(timer);
      }
    }, 1000);

    const initialDifference = expiryDate - Date.now();
    setTimeLeft(Math.max(initialDifference, 0));

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{formatTime(timeLeft)}</div>;
};

export default Countdown;
