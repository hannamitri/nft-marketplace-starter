import React, { useEffect, useState } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration);

  // formats the time
  const getFormattedTime = (milliseconds) => {
    if (milliseconds < 0) milliseconds = 0; // make sure the time does go negative
    let totalSeconds = parseInt(milliseconds / 1000);
    let totalMinutes = parseInt(totalSeconds / 60);
    let totalHours = parseInt(totalMinutes / 60);

    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    let hours = totalHours % 24;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    //
    if (time <= 0) {
      return;
    }

    // Set up the timer
    const timerId = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);

    // Clear the timer on component unmount
    return () => clearTimeout(timerId);
  }, [time]);

  return <div>{getFormattedTime(time)}</div>;
};

export default Timer;
