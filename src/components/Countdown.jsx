import { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeftText, setTimeLeftText] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calculateTimeLeft();

    const intervalId = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeLeft() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTimeLeftText("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    const secondsText = Math.floor(secondsLeft) % 60;
    const minutesText = Math.floor(minutesLeft) % 60;
    const hoursText = Math.floor(hoursLeft);

    setTimeLeftText(`${hoursText}h ${minutesText}m ${secondsText}s`);
  }

  return <>{timeLeftText}</>;
};

export default Countdown;
