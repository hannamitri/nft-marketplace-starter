import React, { useEffect, useState } from "react";

const getExpiryTime = (expiryDate) => {
  if (
    expiryDate === null ||
    expiryDate === undefined ||
    expiryDate === ""
  ) {
    return null;
  }

  const timestamp = Number(expiryDate);

  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return null;
  }

  return timestamp < 100000000000
    ? timestamp * 1000
    : timestamp;
};

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const expiry = getExpiryTime(expiryDate);

  if (!expiry) {
    return null;
  }

  const remaining = Math.max(0, expiry - now);

  if (remaining === 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Countdown;