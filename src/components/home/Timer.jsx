import { useEffect, useState } from "react";


export default function Timer({ expiryTime }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    function calculateTimeLeft() {
      const difference = expiryTime - Date.now();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = { hours: 0, minutes: 0, seconds: 0 };
      }
  
      return timeLeft;
    }
  
    return (
      <>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </>
    );
  }
  