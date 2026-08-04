import { useEffect, useState } from "react";


const Countdown = ({ expiryDate }) => {
  
const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
});   

useEffect(() => {
  if (!expiryDate) return;

  const interval = setInterval(() => {
    const difference = expiryDate - Date.now();

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor(difference / (1000 * 60)) % 60;
      const seconds = Math.floor(difference / 1000) % 60;

      setTimeLeft({ hours, minutes, seconds });
    }
  }, 1000);

  return () => clearInterval(interval);
}, [expiryDate]);
  
if (!expiryDate) return null;

return (
  <div className="de_countdown">
     {`${timeLeft.hours}h ${String(timeLeft.minutes).padStart(2, "0")}m ${String(timeLeft.seconds).padStart(2, "0")}s`}
  </div>
);
}


export default Countdown;