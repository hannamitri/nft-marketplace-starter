import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();
    if (difference <= 0) return { expired: true };
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="de_countdown">
      {timeLeft.expired ? (
        <span>Expired</span>
      ) : (
        <>
          {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m{" "}
          {formatTime(timeLeft.seconds)}s
        </>
      )}
    </div>
  );
};

export default Countdown;
