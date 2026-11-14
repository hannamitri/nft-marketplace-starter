import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);


  useEffect(() => {
    function updateTimer () {
    let millisLeft = expiryDate - Date.now();

    if (millisLeft <= 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(intervalId);
      return;
    }

    let secondsLeft = millisLeft / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 60;

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft);

    setSeconds(secondsText)
    setMinutes(minutesText)
    setHours(hoursText)
  }
  
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate])

  return (
    <>
      <div className="de_countdown">
        <span className="timer__hours">{hours}h </span>
        <span className="timer__minutes">{minutes}m </span>
        <span className="timer__seconds">{seconds}s </span>
      </div>
    </>
  );
};

export default Countdown;