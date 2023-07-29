import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  function calculateTimeRemaining() {
    return expiryDate - Date.now();
  }

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, [expiryDate]);

  const secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
  const minutesRemaining = Math.floor(timeRemaining / 1000 / 60) % 60;
  const hoursRemaining = Math.floor(timeRemaining / 1000 / 60 / 60);

  if (
    secondsRemaining === 0 &&
    hoursRemaining === 0 &&
    minutesRemaining === 0
  ) {
    return (
      <div className="de_countdown" style={{ borderColor: "#8364e2" }}>
        EXPIRED
      </div>
    );
  }

  return (
    <div className="de_countdown" style={{ borderColor: "#8364e2" }}>
      {hoursRemaining}h {minutesRemaining}m {secondsRemaining}s
    </div>
  );
};

export default Countdown;
