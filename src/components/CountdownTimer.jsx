import React, { useEffect, useRef, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const intervalRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if (!expiryDate) return;

    const target = new Date(expiryDate).getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        if (isMounted.current) setTimeLeft("Expired");
        clearInterval(intervalRef.current);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (isMounted.current) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalRef.current);
    };
  }, [expiryDate]);
  return <div className="de_countdown">{timeLeft}</div>;
};

export default CountdownTimer;
