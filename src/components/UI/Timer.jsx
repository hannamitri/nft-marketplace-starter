import React, { useEffect, useState } from "react";

export default function Timer({ expiryDate }) {
  let cancelId;
  let timeLeft;
  let seconds;
  let minutes;
  let hours;
  const countdown = expiryDate;
  const [hoursText, setHoursText] = useState([]);
  const [minutesText, setMinutesText] = useState([]);
  const [secondsText, setSecondsText] = useState([]);

  useEffect(() => {
    startTimer(() => {
      cancelAnimationFrame(cancelId);
    });
  }, []);

  function startTimer() {
    cancelId = requestAnimationFrame(updateTimer);
  }

  function updateTimer() {
    timeLeft = countdown - Date.now();

    seconds = Math.floor(timeLeft / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);

    if (timeLeft < 0) {
      cancelAnimationFrame(cancelId);
    } else {
      setHoursText(hours);
      setMinutesText(minutes % 60);
      setSecondsText(seconds % 60);

      cancelId = requestAnimationFrame(updateTimer);
    }
  }
  return (
    <>
      {secondsText > 0 && (
        <div>
          {hoursText}h{minutesText}m{secondsText}s
        </div>
      )}
    </>
  );
}
