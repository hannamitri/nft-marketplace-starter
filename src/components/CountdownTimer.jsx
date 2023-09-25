import React from 'react'

import { useState, useEffect } from 'react';

function CountdownTimer({ expiryDate }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateRemainingTime() {
    const now = Date.now();
    const timeDifference = expiryDate - now;

    if (timeDifference <= 0) {
      // Timer has expired
      return "expired";
    }

    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  if (remainingTime === 0) {
    return <div>Countdown expired!</div>;
  }

  return (
    <div className="de_countdown">{remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
  </div>
  );
}

export default CountdownTimer;