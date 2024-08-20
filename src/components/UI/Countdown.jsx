import React, { useEffect, useState } from "react";

function Countdown({ expiryDate }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (expiryDate <= Date.now()) return; // Do nothing if the expiry date has already passed

    const calculateTime = () => {
      const milliseconds = expiryDate - Date.now();

      if (milliseconds <= 0) {
        clearInterval(intervalId);
        setTime("");
        return;
      }

      const secondsRemaining = milliseconds / 1000;
      const minutesRemaining = secondsRemaining / 60;
      const hoursRemaining = minutesRemaining / 60;

      const seconds = Math.trunc(secondsRemaining % 60);
      const minutes = Math.trunc(minutesRemaining % 60);
      const hours = Math.trunc(hoursRemaining);

      setTime(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();

    const intervalId = setInterval(calculateTime, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  return time ? <div className="de_countdown">{time}</div> : null;
}

export default Countdown;
