import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = expiryDate - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  const zeroPad = (num, places) => {
    return String(num).padStart(places, 0);
  };

  return timeRemaining.hours <= 0 &&
    timeRemaining.minutes <= 0 &&
    timeRemaining.seconds <= 0
    ? "Expired"
    : `${zeroPad(timeRemaining.hours, 2)}h ${zeroPad(timeRemaining.minutes, 2)}m ${zeroPad(timeRemaining.seconds, 2)}s`;
};

export default Countdown;
