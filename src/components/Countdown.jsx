import React, { useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [time, setTime] = useState("");
  const [intervalId, setIntervalId] = useState();

  React.useEffect(() => {
    calculateTime();

    const intervalId = setInterval(() => {
      calculateTime();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTime("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setTime(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
  }
  return <div className="de_countdown">{time}</div>;
};

export default Countdown;
