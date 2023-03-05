import React, { useEffect, useRef, useState } from "react";

const Timer = ({ expiryDate }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(60);
  const [hours, setHours] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {
   intervalRef.current = setInterval(() => {
      updateTimer(expiryDate);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [expiryDate]);

  function updateTimer(expiryDate) {
    const timeRemaining = expiryDate - Date.now();

    const secondsLeft = timeRemaining / 1000;
    const minutesLeft = timeRemaining / 1000 / 60;
    const hoursLeft = timeRemaining / 1000 / 60 / 60;

    const secondsText = Math.floor(secondsLeft % 60);
    const minutesText = Math.floor(minutesLeft % 60);
    const hoursText = Math.floor(hoursLeft % 60);

    setHours(hoursText);
    setMinutes(minutesText);
    setSeconds(secondsText);
  }

  if (hours < 0 && minutes < 0 && seconds < 0) {
    clearInterval(intervalRef.current)
    return <div className="de_countdown">EXPIRED</div>;
  } else {
    return (
      <div className="de_countdown">
        {hours}h {minutes}min {seconds}s
      </div>
    );
  }
};

export default Timer;
