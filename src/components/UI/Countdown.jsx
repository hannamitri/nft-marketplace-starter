import React, { useEffect, useState } from "react";

const Countdown = ({ endTime }) => {
  const calculateTimeLeft = () => {
    if (!endTime) {
      // If null, no countdown
      return { hours: 0, minutes: 0, seconds: 0, finished: true };
    }

    const diff = endTime - Date.now();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, finished: true };
    }

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      finished: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft.finished) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, timeLeft.finished]);

  if (timeLeft.finished) return null; // hide countdown if finished or null

  return (
    <div className="de_countdown">
      {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </div>
  );
};

export default Countdown;
