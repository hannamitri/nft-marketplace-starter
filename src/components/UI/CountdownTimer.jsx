import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      
      if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        setIsExpired(true);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (isExpired) {
    return <div className="de_countdown expired">EXPIRED</div>;
  }

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default CountdownTimer;
