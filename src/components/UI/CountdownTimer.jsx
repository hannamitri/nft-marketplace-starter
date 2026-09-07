import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ expiryDate }) => {
  
  const [timeLeftStr, setTimeLeftStr] = useState('');
  
  
  const cancelIdRef = useRef(null);

  useEffect(() => {
    
    const targetTime = expiryDate

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      let timeLeft = targetTime - currentTime;

      if (timeLeft <= 0) {
        setTimeLeftStr('Expired');
        if (cancelIdRef.current) {
          cancelAnimationFrame(cancelIdRef.current);
        }
        return;
      }

      const seconds = Math.floor(timeLeft / 1000) % 60;
      const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));

    
      setTimeLeftStr(`${hours}h ${minutes}m ${seconds}s`);
     
      cancelIdRef.current = requestAnimationFrame(updateCountdown);
    };

   
    cancelIdRef.current = requestAnimationFrame(updateCountdown);

    return () => {
      if (cancelIdRef.current) {
        cancelAnimationFrame(cancelIdRef.current);
      }
    };
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeftStr}</div>;
};

export default CountdownTimer;
