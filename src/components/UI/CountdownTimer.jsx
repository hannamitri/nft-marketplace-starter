import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) {
      setTimeLeft("Expired");
      return;
    }

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds

      // ms to sec converter (legnth 13)
      const expiryInSeconds =
        expiryDate > 9999999999 ? Math.floor(expiryDate / 1000) : expiryDate;

      const timeDiff = expiryInSeconds - now; // Corrected time difference

      const hours = Math.floor(timeDiff / 3600); // Convert seconds to hours
      const minutes = Math.floor((timeDiff % 3600) / 60); // Get remaining minutes
      const seconds = timeDiff % 60; // Get remaining seconds

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Initial update
    updateCountdown();

    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default CountdownTimer;
