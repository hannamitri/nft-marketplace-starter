import React, { useEffect, useState } from "react";



function Countdown({ expiryDate }) {
    const [time, setTime] = useState("");
    const [intervalId, setIntervalId] = useState();
  
    useEffect(() => {
      calculateTime();
  
      const interval = setInterval(() => {
        calculateTime();
      }, 1000);
  
      setIntervalId(interval)
  
      return () => {
          clearInterval(interval)
      }
    }, []);
  
    function calculateTime() {
      const milliseconds = expiryDate - Date.now();
  
      if (milliseconds < 0) {
          clearInterval(intervalId);
          setIntervalId("expired");
          return;
      }
  
      const secondsRemaining = milliseconds / 1000;
      const minutesRemaining = secondsRemaining / 60;
      const hoursRemaining = minutesRemaining / 60;
  
      const seconds = Math.trunc(secondsRemaining % 60);
      const minutes = Math.trunc(minutesRemaining % 60);
      const hours = Math.trunc(hoursRemaining);
  
      setTime(`${hours}h ${minutes}m ${seconds}s`);
    }
  
    return <div className="de_countdown">{time}</div>;
  }
  
  export default Countdown;