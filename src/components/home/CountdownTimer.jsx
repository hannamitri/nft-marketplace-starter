import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {timeRemaining ? (
        <div className="countdown">
          {timeRemaining.hours}h
          {timeRemaining.minutes.toString().padStart(2, "0")}m 
          {timeRemaining.seconds.toString().padStart(2, "0")}s
        </div>
      ) : (
        <div>EXPIRED</div>
      )}
    </div>
  );
};

export default CountdownTimer;
