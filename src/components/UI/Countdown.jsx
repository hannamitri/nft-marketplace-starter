import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Generate random values for hours, minutes, and seconds
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);

    setTime({
      hours: randomHours,
      minutes: randomMinutes,
      seconds: randomSeconds,
    });

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(timer);
          return prevTime;
        }

        let newHours = prevTime.hours;
        let newMinutes = prevTime.minutes;
        let newSeconds = prevTime.seconds;

        if (newSeconds === 0) {
          if (newMinutes === 0) {
            newHours = newHours - 1;
            newMinutes = 59;
          } else {
            newMinutes = newMinutes - 1;
          }
          newSeconds = 59;
        } else {
          newSeconds = newSeconds - 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  const { hours, minutes, seconds } = time;

  return (
    <div className="de_countdown">
      <span className="countdown-time">{formatTime(hours)}h </span>
      <span className="countdown-time">{formatTime(minutes)}m </span>
      <span className="countdown-time">{formatTime(seconds)}s </span>
    </div>
  );
};

export default Countdown;
