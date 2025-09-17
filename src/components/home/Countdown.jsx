import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(expiryDate - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <span>Expired</span>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <span>
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};

export default Countdown;
