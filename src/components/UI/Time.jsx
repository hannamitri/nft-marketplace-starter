import React, { useEffect, useState } from "react";

const Timer = ({ expiryDate }) => {

  const [calcTime, setCalcTime] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    Time();

    const intervalId = setInterval(() => {
      Time();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  function Time() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setCalcTime("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setCalcTime(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
  }

  return <div className="de_countdown">{calcTime}</div>;
};

export default Timer;