import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();
    if (difference <= 0) return null;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="de_countdown">
      {timeLeft ? timeLeft : "Expired"}
    </div>
  );
};

export default CountdownTimer;
