import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(expiryDate);
    const diff = end - now;

    if (diff > 0) {
      return {
        total: diff,
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    } else {
      return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft.total === 0) {
    return <span>Time Expired</span>;
  }

  return (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

export default Countdown;

