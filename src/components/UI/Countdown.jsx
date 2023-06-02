import React, { useEffect, useState } from "react";
import updateTimer from "./Timer";

let startTime = Date.now();

export const CountDown = ({ expiryTime }) => {
  const [timer, setTimer] = useState(null);
  const [expire, setExpire] = useState(false);

  useEffect(() => {
    let cancelId = setInterval(() => {
      let { seconds, minutes, hours, expired } = updateTimer(
        startTime,
        expiryTime
      );
      if (!expired) {
        setTimer({ seconds, minutes, hours });
      }
      setExpire(expired);
    }, 1000);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  return !expire ? (
    timer !== null ? (
      <span>{`${timer.hours}h ${timer.minutes}m ${timer.seconds}s`}</span>
    ) : (
      <div style={{ color: "gray" }}>Loading</div>
    )
  ) : (
    <span style={{ color: "gray" }}>Expired</span>
  );
};
