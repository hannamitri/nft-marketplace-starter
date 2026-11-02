import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!expiryDate) return { expired: true };
    const difference = expiryDate - Date.now();
    if (difference <= 0) return { expired: true };

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (hours === 0 && minutes === 0 && seconds === 0) {
      return { expired: true };
    }

    return { hours, minutes, seconds, expired: false };
  });

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      if (difference <= 0) return { expired: true };

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (hours === 0 && minutes === 0 && seconds === 0) {
        return { expired: true };
      }

      return { hours, minutes, seconds, expired: false };
    };

    const timer = setInterval(() => {
      const res = calculateTimeLeft();
      setTimeLeft(res);
      if (res.expired) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // Returns nothing if expired, missing, or at 0h 0m 0s
  if (timeLeft.expired) {
    return null;
  }

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default CountdownTimer;
