import React, { useState, useEffect, useRef } from 'react';

const Countdown = ({ expiryDate }) => {
  const [remainingTime, setRemainingTime] = useState(Math.max(0, expiryDate - Date.now()));
  const timerRef = useRef(null);

  useEffect(() => {
    const updateRemainingTime = () => {
      const timeLeft = Math.max(0, expiryDate - Date.now());
      setRemainingTime(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timerRef.current);
      }
    };

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (expiryDate > Date.now()) {
      timerRef.current = setInterval(updateRemainingTime, 1000);
    }

    updateRemainingTime();

    return () => clearInterval(timerRef.current);
  }, [expiryDate]);

  const formatCountdown = () => {
    if (remainingTime <= 0) return "Auction Closed";

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  return <div className="de_countdown">{formatCountdown()}</div>;
};

export default Countdown;
