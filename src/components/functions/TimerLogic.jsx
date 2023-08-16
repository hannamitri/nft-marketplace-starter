import React, { useEffect, useState } from 'react';

const TimerLogic = ({ expiryDate }) => {
 const timeDifference = (expiryDate - Date.now());
  const [seconds, setSeconds] = useState(Math.floor((timeDifference / 1000) % 60));
  const [minutes, setMinutes] = useState(Math.floor((timeDifference / 1000 / 60) % 60));
  const [hours, setHours] = useState(Math.floor(timeDifference / 1000 / 60 / 60));

  useEffect(() => {
    // constantly render setInterval; setInterval returns an ID that can be used to cancel render;
        // storing cancel ID inside intervalID to stop timer
    const intervalId = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0 ) {
                    // if timer is at 0 seconds in total, stop timer.
                    clearInterval(intervalId);
                    return;
                } else {
                    // otherwise, from hours, subtract one and adjust timer accordingly
                    setHours(prevHours => prevHours - 1);
                    setMinutes(59);
                    setSeconds(59);
                }
            } else {
                // if minutes is not = 0, then adjust timer accordingly
                setMinutes(prevMinutes => prevMinutes - 1);
                setSeconds(59);
            }
        } else {
            // if seconds is not === 0, then adjust accordingly by changing seconds
            setSeconds(prevSeconds => prevSeconds - 1);
        }
        // Re-render function so that every 1 second runs;
    }, 1000)

    // if function ends, then clear
    return () => clearInterval(intervalId);
  }, [seconds, minutes, hours]);

  // Format the countdown for display
  const formattedCountdown = `${hours}h ${minutes}m ${seconds}s`;

  // If countdown is expired
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return <div>EXPIRED</div>;
  }

  return <div>{formattedCountdown}</div>;
};

export default TimerLogic;