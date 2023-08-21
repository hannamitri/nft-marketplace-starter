import { useEffect, useState } from "react";

const Countdown = ({ info }) => {
  const [timer, setTimer] = useState(updateTimer());
  function updateTimer() {
    let startTime = Date.now();

    let millisLeft = info.expiryDate - startTime;
    let secondsLeft = Math.floor((millisLeft / 1000) % 60);
    let minutesLeft = Math.floor((secondsLeft / 60) % 60);
    let hoursLeft = Math.floor(millisLeft / 1000 / 60 / 60);

    return {
      millisLeft,
      secondsLeft,
      minutesLeft,
      hoursLeft,
    };
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(updateTimer());
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {timer && timer.millisLeft > 0 ? (
        <div className="de_countdown">
          {timer.hoursLeft}h {timer.minutesLeft}m {timer.secondsLeft}s
        </div>
      ) : null}
    </>
  );
};

export default Countdown;
