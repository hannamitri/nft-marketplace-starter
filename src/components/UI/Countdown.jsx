import { useEffect, useState } from "react";

export default function Countdown({ info }) {
  const [time, setTime] = useState(getTimer());

  function getTimer() {
    let currentDate = Date.now();

    const milliseconds = info.expiryDate - currentDate;
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {time.milliseconds > 0 ? (
        <div className="de_countdown">
          {time.hours}h {time.minutes}m {time.seconds}s
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
