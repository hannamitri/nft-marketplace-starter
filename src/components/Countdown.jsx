import React, { useEffect, useState } from "react";

function getRemainingTime(expiryDate) {
  const now = Date.now();
  const diff = expiryDate - now;

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: false };
}

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    expiryDate ? getRemainingTime(expiryDate) : { expired: true }
  );

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  // ⭐ If expiryDate is missing → show nothing
  if (!expiryDate) return null;

  // ⭐ If expired → show EXPIRED
  if (timeLeft.expired) {
    return <div className="de_countdown expired">EXPIRED</div>;
  }

  const isEndingSoon =
    timeLeft.hours === 0 && (timeLeft.minutes > 0 || timeLeft.seconds > 0);

  return (
    <div className={`de_countdown ${isEndingSoon ? "ending-soon" : ""}`}>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default Countdown;