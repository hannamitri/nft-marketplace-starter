
import React, { useState, useEffect } from "react";

function CountDown({ fullTime }) {
  const [timeRemaining, setTimeRemaining] = useState(fullTime);
  useEffect(() => {
    const timer = setInterval(() => {
      const currTime = Math.floor(Date.now() / 1000);
      const timeLeft = fullTime  - currTime;
      setTimeRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining) % 60;
  console.log(`hours is ${hours}`)
  return hours > 100 ? (
    <div>
      {}h: {}m: {}s
    </div>
  ) : (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
  
  
}

export default CountDown;