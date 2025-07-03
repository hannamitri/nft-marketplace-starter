 import React from "react";
 import { useState,useEffect } from "react";
const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  function getTimeRemaining(expiryDate) {
    const total = expiryDate - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return <div className="de_countdown">{timeLeft}</div>;
};

export default  CountdownTimer 