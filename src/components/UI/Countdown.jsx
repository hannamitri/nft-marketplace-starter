import React, { useState, useEffect } from "react";

function TimeCountdown({ expiryDate }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(function () {
      setNow(Date.now());
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, []);

  if (!expiryDate) {
    return null;
  }

  const timeLeft = expiryDate - now;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="de_countdown">
      {hours}h:{minutes}m:{seconds}s
    </div>
  );
}

const Countdown = ({
  expiryDate
}) => {
  return (
    <>
          <TimeCountdown expiryDate={expiryDate} />
    </>
  );
};

export default Countdown;
