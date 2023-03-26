import React, { useState, useEffect, memo } from "react";

const Countdown = ({ expiry }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let millisecondsElapsed = Date.now();

      let millisLeft = expiry - millisecondsElapsed;

      setSecondsLeft(Math.floor(millisLeft / 1000) % 60);
      setMinutesLeft(Math.floor(millisLeft / 1000 / 60) % 60);
      setHoursLeft(Math.floor(millisLeft / 1000 / 60 / 60) % 24);
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  }, [expiry]);

  if (expiry === "null" || expiry === null) {
    return <></>;
  } else {
    return (
      <div className="de_countdown">
        {Math.floor(hoursLeft)}h {Math.floor(minutesLeft)}m{" "}
        {Math.floor(secondsLeft)}s
      </div>
    );
  }
};

export default memo(Countdown);