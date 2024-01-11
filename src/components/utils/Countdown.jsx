import React, { useEffect, useState } from "react";

const Countdown = (expiryDate) => {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();

  function updateCountdown() {
    let millisLeft = expiryDate - Date.now();

    if (millisLeft <= 0) {
      return "Expired";
    }

    let secondsLeft = millisLeft / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 60;

    let secondsText = Math.floor(secondsLeft % 60);
    let minutesText = Math.floor(minutesLeft % 60);
    let hoursText = Math.floor(hoursLeft % 24);

    setSeconds(secondsText);
    setMinutes(minutesText);
    setHours(hoursText);
  }

  useEffect(() => {
    const intervalId = setInterval(updateCountdown(), 1000);
    return () => clearInterval(intervalId);
  });

  const zeroPad = (num, places) => {
    return String(num).padStart(places, 0);
  };

  return (
    <div>
      {zeroPad(hours, 2)}h {zeroPad(minutes, 2)}m {zeroPad(seconds, 2)}s
    </div>
  );
};

export default Countdown;
