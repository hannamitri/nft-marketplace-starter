import React, { useEffect, useState, memo } from "react";

const CountdownTimer = memo(({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    if (!expiryDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(expiryDate).getTime();
      const timeDiff = expiryTime - now;

      if (timeDiff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

 
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); 
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
});

export default CountdownTimer;