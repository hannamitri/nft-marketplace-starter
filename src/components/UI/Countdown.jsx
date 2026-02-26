import React, { useState, useEffect } from "react";

const Countdown = ({expiryDate}) => {
    
    const calculateTimeLeft = () => {
        //1000 = 1 second
        const oneSecond = 1000;
        // 60 seoconds = 1 minute
        const oneMinute = 60;
        // 60 minutes = 1 hour
        const oneHour = 60;

       
    // Subtract current time from expiry time, result is in milliseconds
    const difference = new Date(expiryDate) - new Date();
    
    // If time has expired or no date provided, return zeros
    if (difference <= 0) return "Expired";


    
    // Convert milliseconds to hours (1000ms * 60s * 60min)
    const hours = Math.floor(difference / (oneSecond * oneMinute * oneHour));


    // Get remaining milliseconds after removing hours, then convert to minutes
    const minutes = Math.floor((difference % (oneSecond * oneMinute * oneHour)) / (oneSecond * oneMinute));

    // Get remaining milliseconds after removing minutes, then convert to seconds
    const seconds = Math.floor((difference % (oneSecond * oneMinute)) / oneSecond);

    // Return formatted string - padStart(2, "0") ensures 2 digits e.g. 5 becomes "05"
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // State to store the countdown string, initialized by calling calculateTimeLeft immediately
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // setInterval calls the function every 1000ms (1 second)
    const timer = setInterval(() => {
      // Recalculate and update the timeLeft state every second
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup function - when component is removed from page, 
    // clearInterval stops the timer to prevent memory leaks
    return () => clearInterval(timer);

  // Re-run this effect if expiryDate prop changes
  }, [expiryDate]);


  return <div className="de_countdown">{timeLeft}</div>;

}

export default Countdown;