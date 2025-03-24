import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

    useEffect(() => {
      if (!expiryDate) return;

      const interval = setInterval(() => {
        const updatedTime = calculateTimeLeft(expiryDate);
        setTimeLeft(updatedTime);

        if (updatedTime.total <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);

    function calculateTimeLeft(expiry) {
      const now = Date.now();
      const difference = expiry - now;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    if (timeLeft.total <= 0) return null;

    return (
      <div className="de_countdown">
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    );
  }

  export default CountdownTimer;