import React, { useState, useEffect } from "react";

function CountdownTimer({ targetTime }) {
  const calculateTimeRemaining = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    return targetTime/1000 - currentTime;
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining) % 60;

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

export default CountdownTimer;
