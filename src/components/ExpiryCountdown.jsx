import React, { useState, useEffect } from "react";

const ExpiryCountdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calculateTimeLeft();

    // count every second
    const intervalId = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeLeft() {
    const millisecondsLeft = expiryDate - Date.now();

    if (millisecondsLeft < 0) {
      clearInterval(intervalId);
      setTimeLeft("EXPIRED");
      return;
    }

    const secondsLeft = Math.floor(millisecondsLeft / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    const hoursLeft = Math.floor(minutesLeft / 60);

    setTimeLeft(`${hoursLeft}h ${minutesLeft % 60}m ${secondsLeft % 60}s`);
  }

  return <div className="de_countdown">{timeLeft}</div>;
};

export default ExpiryCountdown;
