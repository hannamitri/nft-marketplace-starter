import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) {
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
          return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          return `${minutes}m ${seconds}s`;
        } else if (seconds > 0) {
          return `${seconds}s`;
        } else {
          return "Expired";
        }
      } else {
        return "Expired";
      }
    };

    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // Don't render anything if there's no expiry date
  if (!expiryDate) {
    return null;
  }

  return <span>{timeLeft}</span>;
};

export default CountdownTimer;
