import React, { useState, useEffect } from "react";

function CountDownTimer({ items }) {
  const [timeStrings, setTimeStrings] = useState([]);

  useEffect(() => {
    let timerId = null;

    const updateTimer = () => {
      const newTimeStrings = items.map((item) => {
        const endTime = item.expiryDate;
        const milliSecondsElapsed = endTime - Date.now();
        const secondsElapsed = Math.floor(milliSecondsElapsed / 1000);
        const minutesElapsed = Math.floor(milliSecondsElapsed / (1000 * 60));
        const hoursElapsed = Math.floor(milliSecondsElapsed / (1000 * 60 * 60));

        let secondsText = secondsElapsed % 60;
        let minutesText = minutesElapsed % 60;
        let hoursText = hoursElapsed;

        secondsText = secondsText < 0 ? 0 : secondsText;
        minutesText = minutesText < 0 ? 0 : minutesText;
        hoursText = hoursText < 0 ? 0 : hoursText;

        return { hours: hoursText, minutes: minutesText, seconds: secondsText };
      });
      setTimeStrings(newTimeStrings);
      timerId = requestAnimationFrame(updateTimer);
    };

    timerId = requestAnimationFrame(updateTimer);

    return () => {
      cancelAnimationFrame(timerId);
      setTimeStrings([]); // Clear the state when the component is unmounted
    };
  }, [items]);

  return (
    <div>
      {timeStrings.map((time, index) => (
        <div className="de_countdown" key={index}>
          {time.hours}h {time.minutes}m {time.seconds}s
        </div>
      ))}
    </div>
  );
}

export default CountDownTimer;
