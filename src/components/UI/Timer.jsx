import React, { useState, useEffect } from "react";

const Timer = ({ expiryDate }) => {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();

  function updateTime(expiryDate) {
    let timeDifference = expiryDate - Date.now();

    let secondsLeft = timeDifference / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 60;

    let secondText = Math.floor(secondsLeft % 60);
    let minuteText = Math.floor(minutesLeft % 60);
    let hourText = Math.floor(hoursLeft % 60);

    setSeconds(secondText);
    setMinutes(minuteText);
    setHours(hourText);
  }

  useEffect(() => {
    setInterval(() => {
      updateTime(expiryDate);
    }, 1000);
  }, [expiryDate]);

  return (
    <div>
      <h1>Countdown</h1>
      <p>
        {hours}h {minutes}m {seconds}s
      </p>
    </div>
  );
};

export default Timer;
