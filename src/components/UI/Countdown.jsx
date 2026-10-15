import React, { useEffect } from "react";

const formatTimeLeft = (expiryDate) => {
  const timeLeft = expiryDate - Date.now();
  if (timeLeft <= 0) return "EXPIRED";

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  // Updates the DOM directly instead of using state: a looping Owl carousel
  // clones slides as static HTML, so the clones need updating too.
  useEffect(() => {
    const interval = setInterval(() => {
      document
        .querySelectorAll(`.de_countdown[data-expiry="${expiryDate}"]`)
        .forEach((element) => {
          element.textContent = formatTimeLeft(expiryDate);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="de_countdown" data-expiry={expiryDate}>
      {formatTimeLeft(expiryDate)}
    </div>
  );
};

export default Countdown;
