import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calcTime = () => {
      const now = new Date().getTime();
      const distance = expiryDate - now;

      if (distance < 0) {
        setTimeLeft("EXPIRED");
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(calcTime, 1000);
    calcTime();

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
