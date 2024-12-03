import React, { useEffect, useState } from "react";

function CountdownTimer({ targetDate }) {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [expired, setExpired] = useState(false);

  function calculateTime(targetDate) {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      setExpired(true);
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setHours(hours);
    setMinutes(mins);
    setSeconds(seconds);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateTime(targetDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div>
      {!expired ? (
        <>
          {hours}h {minutes}m {seconds}s
        </>
      ) : (
        <>Expired</>
      )}
    </div>
  );
}

export default CountdownTimer;
