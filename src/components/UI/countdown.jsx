import React from 'react'
import { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
      if (!expiryDate) return;
      const calculateTime = () => {
          const difference = expiryDate - Date.now();
          if (difference <= 0) {
            setTimeLeft("Expired");
            return;
          }
    
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };
    
        calculateTime();
        const interval = setInterval(calculateTime, 1000);
    
        return () => clearInterval(interval);
      }, [expiryDate]);
    
      if (!expiryDate) {
        return null;
      }
    
      return <div className="de_countdown">{timeLeft}</div>;
    };

export default CountdownTimer