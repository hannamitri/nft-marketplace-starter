import React, { useEffect, useState } from "react";

const getTimeLeft = (expiryDate) => {
  const difference = Number(expiryDate) - Date.now();

  if (!expiryDate || Number.isNaN(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
};

const pad = (value) => String(value).padStart(2, "0");

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiryDate));

  useEffect(() => {
    // Recompute immediately so the value is correct when expiryDate changes,
    // instead of showing a stale figure for up to one second.
    setTimeLeft(getTimeLeft(expiryDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!expiryDate) return null;

  if (timeLeft.expired) {
    return <div className="de_countdown">Expired</div>;
  }

  return (
    <div className="de_countdown">
      {timeLeft.days > 0 && `${timeLeft.days}d `}
      {timeLeft.hours}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
    </div>
  );
};

export default Countdown;
