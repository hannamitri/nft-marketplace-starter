import React, { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeToShow, setTimeToShow] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calcTime();

    const intervalId = setInterval(() => {
      calcTime();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calcTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTimeToShow("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;
    const secondsShow = Math.floor(secondsLeft % 60);
    const minutesShow = Math.floor(minutesLeft % 60);
    const hoursShow = Math.floor(hoursLeft);

    setTimeToShow(`${hoursShow}h ${minutesShow}m ${secondsShow}s`);
  }
  return <div className="de_countdown">{timeToShow}</div>;
};

export default CountDown;
