import React, { useEffect, useState } from "react";

const Timer = ({ initialTime }) => {
  const now = new Date();
  const timeLeft = initialTime - now;
  const [seconds, setSeconds] = useState(Math.floor(timeLeft / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (timeLeft) => {
    const hours = (Math.floor(timeLeft / 60 / 60) % 24).toString();
    const minutes = (Math.floor(timeLeft / 60) % 60).toString();
    const seconds = (timeLeft % 60).toString();
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  if (timeLeft > 0) {
    return <div className="de_countdown">{formatTime(seconds)}</div>;
  } else {
    return null;
  }
};

export default Timer;
