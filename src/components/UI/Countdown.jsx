import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {

    const updateCountdown = () => {
    const difference = expiryDate - Date.now()

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        const newTimeLeft = `${hours}h ${minutes}m ${seconds}s`

        if (newTimeLeft !== timeLeft) {
          setTimeLeft(newTimeLeft);
        }
      } else {
        return (
            null
        )
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
 
    return () => clearInterval(interval);
  }, [expiryDate, timeLeft]); 

  return (
    <div className="de_countdown">
      {timeLeft}
    </div>
  );
};

export default Countdown;
