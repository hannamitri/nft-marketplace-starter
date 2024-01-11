import React, { useEffect, useState } from "react";

const Countdown = ({ countdown }) => {
  const [expired, setExpired] = useState("");
  const [timer, setTimer] = useState();

  useEffect(() => {
    calcTime();
    const timer = setInterval(() => {
      calcTime();
    }, 1000);

    setTimer(timer);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calcTime() {
    const millisLeft = countdown - Date.now();

    if (millisLeft < 0) {
      clearInterval(timer);
      setExpired("Expired");
      return;
    }
    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setExpired(
      `${Math.floor(hoursLeft)}h 
      ${Math.floor(minutesLeft % 60)}m 
      ${Math.floor(secondsLeft % 60)}s`
    );
  }

  return <div className="de_countdown">{expired}</div>;
};

export default Countdown;
