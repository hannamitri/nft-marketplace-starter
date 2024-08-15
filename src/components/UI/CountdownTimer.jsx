import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div id="timer" style={{ display: 'flex', gap: '0.5rem' }} aria-live="polite">
      <span className="timer__hours">{timeLeft.hours.toString().padStart(2, "0")}h</span>
      <span className="timer__minutes">{timeLeft.minutes.toString().padStart(2, "0")}m</span>
      <span className="timer__seconds">{timeLeft.seconds.toString().padStart(2, "0")}s</span>
    </div>
  );
};

export default CountdownTimer;