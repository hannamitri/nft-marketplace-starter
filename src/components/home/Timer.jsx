import React, { useEffect, useRef, useState } from "react";

const Timer = (props) => {
  const [hours, setHours] = useState(60);
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(60);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Initialise the current time
      const currentTime = Date.now();

      const timeLeft = props.expiryDate - currentTime;

      setHours(Math.max(Math.floor(timeLeft / (1000 * 60 * 60)), 0));
      setMinutes(Math.max(Math.floor(timeLeft / (1000 * 60)) % 60, 0));
      setSeconds(Math.max(Math.floor((timeLeft / 1000) % 60), 0));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  });

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalRef.current);
    }
  }, [hours, minutes, seconds]);

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Timer;
