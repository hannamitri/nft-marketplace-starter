import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calcTimeLeft = () => {
      const distance = expiryDate - new Date().getTime();
      if (distance <= 0) return "Expired";
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      return `${h}h ${m}m ${s}s`;
    };

    setTimeLeft(calcTimeLeft());
    const interval = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (t === "Expired") clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default CountdownTimer;
