import React, { useState, useEffect } from 'react';

const ExpiryTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const expiryInMillis = expiryDate > 1e12 ? expiryDate : expiryDate * 1000;
      const millisLeft = expiryInMillis - Date.now();

      if (millisLeft < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor((millisLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((millisLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((millisLeft % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return (
    <div
      className="position-absolute bg-white bg-opacity-75 backdrop-blur p-1 rounded-pill text-dark border shadow-sm fw-semibold text-nowrap"
      style={{
        top: '12px',
        right: '12px',
        fontSize: '12px',
        zIndex: 20
      }}
    >
      {timeLeft}
    </div>
  );
};

export default ExpiryTimer;