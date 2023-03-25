import React, { useState } from "react";

export default function Countdown({ expiry }) {

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);

  function updateTimer() {
    let millisecondsElapsed = Date.now();

    let millisLeft = expiry - millisecondsElapsed;

    setSecondsLeft(Math.floor(millisLeft / 1000) % 60);
    setMinutesLeft(Math.floor(millisLeft / 1000 / 60) % 60);
    setHoursLeft(Math.floor(millisLeft / 1000 / 60 / 60) % 24);
  }

  setInterval(updateTimer, 1000 / 60);
    
  if (expiry === "null") {
    return <></>
    } else {
      return (
        <div className="de_countdown">
        {Math.floor(hoursLeft)}h {Math.floor(minutesLeft)}m{" "}
        {Math.floor(secondsLeft)}s
      </div>)
    }
}
