import { getRemainingUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import React, { useEffect, useState } from "react";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "0",
};

function CountdownTimer ({countdownTimestampsMs}) {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
        updateRemainingTime(countdownTimestampsMs);
    }, 1000);
    return () => clearInterval(intervalId)
  }, [countdownTimestampsMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingUntilMsTimestamp(countdown));
  }

  return <div>
    <span>{remainingTime.hours}h </span>
    <span>{remainingTime.minutes}m </span>
    <span>{remainingTime.seconds}s</span>
    </div>;
}

export default CountdownTimer;
