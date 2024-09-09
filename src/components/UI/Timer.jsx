import React, { useEffect, useState } from "react";

const Timer = ({ expDate }) => {
  const startTime = Date.now();
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  let timeLeft = expDate - startTime;

  function start() {
    requestAnimationFrame(updateCount);
  }

  function updateCount() {
    requestAnimationFrame(updateCount);
    let millisElapsed = Date.now() - startTime;
    let millisCountdown = timeLeft - millisElapsed;
    let secondsLeft = Math.floor(millisCountdown / 1000);

    setSeconds(secondsLeft % 60);
    setMinutes(Math.floor((secondsLeft / 60) % 60));
    setHours(Math.floor(secondsLeft / 60 / 60));
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Timer;
