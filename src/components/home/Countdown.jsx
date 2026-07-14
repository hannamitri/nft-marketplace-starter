import { useState, useEffect } from "react";

const Countdown = ({ expiryTime }) => {
  const [now, setNow] = useState(Date.now());
  const diff = expiryTime - now;
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {hours}h {minutes}m {seconds} s
    </div>
  );
};
export default Countdown;
