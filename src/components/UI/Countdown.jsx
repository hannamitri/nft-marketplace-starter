import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const oneSecond = 1000;
      const oneMinute = 60;
      const oneHour = 60;

      const difference = new Date(expiryDate) - new Date();

      if (difference <= 0) return "Expired";

      const hours = Math.floor(difference / (oneSecond * oneMinute * oneHour));
      const minutes = Math.floor(
        (difference % (oneSecond * oneMinute * oneHour)) / (oneSecond * oneMinute)
      );
      const seconds = Math.floor(
        (difference % (oneSecond * oneMinute)) / oneSecond
      );

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;