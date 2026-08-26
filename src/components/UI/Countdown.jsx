import React, { useEffect, useState } from "react";

const calculateTimeRemaining = (expiryDate) => {
  const difference = expiryDate - Date.now();

  if (difference <= 0) {
    return "Expired";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor((difference / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeRemaining(expiryDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeRemaining}</div>;
};

export default Countdown;