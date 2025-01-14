import React, { useState, useEffect } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration - Date.now()); // Calculate remaining time initially

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(duration - Date.now()); // Update remaining time
      }, 1000);

      // Cleanup interval on unmount
      return () => clearInterval(timerId);
    }
  }, [duration, time]);

  const getFormattedTime = (milliseconds) => {
    let total_seconds = Math.floor(milliseconds / 1000);
    let total_minutes = Math.floor(total_seconds / 60);
    let total_hours = Math.floor(total_minutes / 60);

    let seconds = total_seconds % 60;
    let minutes = total_minutes % 60;
    let hours = total_hours % 24;

    return `${hours}hrs ${minutes}m ${seconds}s`;
  };

  // Stop rendering time if it reaches zero
  if (time <= 0) {
    return <div>Expired</div>;
  }

  return <div>{getFormattedTime(time)}</div>;
};

export default Timer;