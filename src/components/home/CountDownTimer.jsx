import React, { useEffect, useState } from "react";

const CountDownTimer = ({ expiryDate }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTime = () => {
      const target = new Date(expiryDate).getTime();
      const now = Date.now();
      const millisLeft = target - now;

      if (isNaN(target)) {
        setTime("Invalid date");
        return;
      }

      if (millisLeft <= 0) {
        setTime("EXPIRED");
        return;
      }

      const totalSeconds = Math.floor(millisLeft / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTime(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{time}</div>;
};

export default CountDownTimer;
