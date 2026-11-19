import React, { useEffect, useState } from "react";

const ExpiryTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const now = Date.now();
      const target =
      typeof expiryDate === "number" 
      ? expiryDate
      : new Date(expiryDate).getTime();

       const diff = target - now;

if (diff <= 0) {
  setTimeLeft("EXPIRED");
  return;
}

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, "0");
      setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

return <div className="de_countdown">{timeLeft}</div>;
};

export default ExpiryTimer;