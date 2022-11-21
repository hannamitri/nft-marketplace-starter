import { getRemainingUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import React, { useEffect, useState } from "react";


function CountdownTimer({ countdownTimestampsMs }) {
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampsMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampsMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingUntilMsTimestamp(countdown));
  }

  if (countdownTimestampsMs == null) {
    return null;
  } else if (
    remainingTime.hours <= 0 &&
    remainingTime.minutes <= 0 &&
    remainingTime.seconds <= 0
  ) {
    return "EXPIRED";
  } else {
    return (
      <div>
        <span>{remainingTime.hours}h </span>
        <span>{remainingTime.minutes}m </span>
        <span>{remainingTime.seconds}s</span>
      </div>
    );
  }
}

export default CountdownTimer;
