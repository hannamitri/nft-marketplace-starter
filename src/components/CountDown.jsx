import React, { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeText, setTimeText] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calculateTime();

    const intervalId = setInterval(() => {
      calculateTime();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  function calculateTime() {
    const millsLeft = expiryDate - Date.now();

    if (millsLeft < 0) {
      clearInterval(intervalId);
      setTimeText("EXPIRED");
      return;
    }

    const secondsLeft = millsLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setTimeText(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
  }

  return <div className="de_countdown">{timeText}</div>;
};

export default CountDown;
