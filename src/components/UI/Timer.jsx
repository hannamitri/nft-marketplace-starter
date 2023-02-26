import React, { useEffect, useState } from "react";

function Timer({ expiryDate }) {
  const [time, setTime] = useState(Date.now());
  let timerSecond = (expiryDate - time) / 1000;

  if (timerSecond < 0) {
    timerSecond = 0;
  }
  const timerMinute = timerSecond / 60;
  const timerHour = timerMinute / 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="de_countdown">{`${Math.floor(timerHour)}h ${Math.floor(
      timerMinute % 60
    )}m ${Math.floor(timerSecond % 60)}s`}</div>
  );
}

export default Timer;
