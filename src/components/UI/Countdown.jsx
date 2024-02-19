// Countdown.jsx

import React, { useState, useEffect } from 'react';

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate).getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

const Countdown = ({ expiryDate }) => {
  const countdown = useCountdown(expiryDate);

  if (!countdown) return null;

  return (
    <div className="de_countdown">
      {countdown}
    </div>
  );
};

export default Countdown;
