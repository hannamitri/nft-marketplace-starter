import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = expiryDate - Date.now();

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft.expired) {
    return <div className="de_countdown">Expired</div>;
  }

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {String(timeLeft.minutes).padStart(2, "0")}m{" "}
      {String(timeLeft.seconds).padStart(2, "0")}s
    </div>
  );
};

export default Countdown;
