import React, { useEffect, useState } from "react";

const ExpCountdown = ({ expiryDate }) => {
  const [countdowns, setCountdowns] = useState(0);

  useEffect(() => {
    if ( !expiryDate || isNaN(expiryDate)) return;

    const interval = setInterval(() => { 
      const now = Date.now();
      const distance = expiryDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        
        setCountdowns(0);
      }else {
        setCountdowns(distance)
      }
    }, 1000);

    return () => clearInterval(interval);
          
  }, [expiryDate]);
    
      
      const formatTime = (ms) => {
        if (!ms || ms <= 0) return "00h 00m 00s";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}h ${minutes}m ${seconds}s`;
      };
      return <p>{formatTime(countdowns)}</p>
    };

export default ExpCountdown;