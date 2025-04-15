import React, { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const calculateTimeLeft = (expiry) => {
    const now = Date.now();
    const difference = expiry - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="de_countdown">
      {expiryDate
        ? `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
        : "Expired"}
    </div>
  );
};

export default CountDown;
