import React, { useEffect, useState } from 'react';

// This custom hook contains the core countdown logic.
const useCountdown = (expiryTimestamp) => {
  const [timeLeft, setTimeLeft] = useState(expiryTimestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = expiryTimestamp - Date.now();
      // Stop the interval if the countdown is finished
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [expiryTimestamp]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};


// This is the reusable UI component.
const Countdown = ({ expiryDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(expiryDate);

  if (days + hours + minutes + seconds <= 0) {
    return null; // Don't render anything if the countdown is over
  }

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {`${hours}h ${minutes}m ${seconds}s`}
    </div>
  );
};

export default Countdown;