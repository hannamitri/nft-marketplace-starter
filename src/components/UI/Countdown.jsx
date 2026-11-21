import React, { useEffect, useState } from "react";

// Shows "5h 30m 32s" counting down to expiryDate (a timestamp in ms).
// Re-calculates once per second and cleans up its timer when removed.
const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(expiryDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <div className="de_countdown">EXPIRED</div>;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Countdown;
