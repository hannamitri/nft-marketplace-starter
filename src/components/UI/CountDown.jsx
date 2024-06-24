import React, { useEffect, useState } from "react";

const CountDown = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: formatTime(Math.floor((difference / 1000 / 60) % 60)),
        seconds: formatTime(Math.floor((difference / 1000) % 60)),
      };
    }

    return timeLeft;
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {timeLeft.hours !== undefined ? (
        <span>{timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}</span>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
