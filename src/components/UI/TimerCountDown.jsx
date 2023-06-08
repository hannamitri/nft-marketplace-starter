import { useEffect, useState } from "react";

const TimerCountDown = ({ expiryDate }) => {

  // write function before using it to set intial hook value
  const updateTimer = (millisLeft) => {
    if (millisLeft < 0) return "Item Expired";

    let seconds = Math.floor(millisLeft / 1000) % 60;
    let minutes = Math.floor(millisLeft / 1000 / 60) % 60;
    let hours = Math.floor(millisLeft / 1000 / 60 / 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(
    updateTimer(expiryDate - Date.now())
  );
  useEffect(() => {
    // update setTimeLeft every second by calling updateTimer function
    setInterval(() => {
      setTimeLeft(updateTimer(expiryDate - Date.now()));
    }, 1000);
  }, []);
  return <div className="de_countdown">{timeLeft}</div>;
};

export default TimerCountDown;
