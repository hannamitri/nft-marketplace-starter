import { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [time, setTime] = useState("");
  const [idInterval, setIdInterval] = useState();

  useEffect(() => {
    calcTime();

    const intervalId = setInterval(() => {
      calcTime();
    }, 1000);

    setIdInterval(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calcTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(idInterval);
      setIdInterval("Expired");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    const hoursText = Math.floor(hoursLeft);
    const minutesText = Math.floor(minutesLeft % 60);
    const secondsText = Math.floor(secondsLeft % 60);

    setTime(`${hoursText}h ${minutesText}m ${secondsText}s`);
  }

  return <div className="de_countdown">{time}</div>;
};

export default Countdown;
