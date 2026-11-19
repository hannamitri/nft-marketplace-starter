import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = expiryDate - now;

      if (distance < 0) {
        setCountdown("EXPIRED");
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); 
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  if (!countdown) return null; 

  return <div className="de_countdown">{countdown}</div>;
};

export default Countdown;