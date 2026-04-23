import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate, hideWhenNoExpiry = true }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!expiryDate) {
    if (hideWhenNoExpiry) {
      return null;
    }

    return <div className="de_countdown">No expiry</div>;
  }

  const difference = expiryDate - currentTime;

  if (difference <= 0) {
    return <div className="de_countdown">Ended</div>;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    const remainingHours = Math.floor((totalSeconds % 86400) / 3600);
    return (
      <div className="de_countdown">{`${days}d ${remainingHours}h ${minutes}m ${seconds}s`}</div>
    );
  }

  return <div className="de_countdown">{`${hours}h ${minutes}m ${seconds}s`}</div>;
};

export default CountdownTimer;