import React, { useEffect, useState } from "react";

const NEW_ITEM_COUNTDOWN_SECONDS = 5 * 60 * 60 + 30 * 60;

const secondsRemaining = (expiresAt) =>
  Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

const Countdown = ({ expiresAt, className = "" }) => {
  const [secondsLeft, setSecondsLeft] = useState(() => secondsRemaining(expiresAt));

  useEffect(() => {
    const update = () => setSecondsLeft(secondsRemaining(expiresAt));
    update();
    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [expiresAt]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <span className={`de_countdown ${className}`} aria-label={`Time remaining: ${hours} hours ${minutes} minutes ${seconds} seconds`} aria-live="off">
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export const NewItemCountdown = () => {
  const [expiresAt] = useState(() => Date.now() + NEW_ITEM_COUNTDOWN_SECONDS * 1000);
  return <Countdown expiresAt={expiresAt} className="new-item__countdown" />;
};

export default Countdown;
