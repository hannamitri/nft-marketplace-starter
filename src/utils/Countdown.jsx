import { useState, useEffect } from 'react';

export function getCountdown(expiryTimestamp) {
  const now = Date.now();
  const timeLeft = expiryTimestamp - now;

  if (timeLeft <= 0) {
    return "";
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
}

export const useCountdown = (initialTimestamp) => {
  const [countdown, setCountdown] = useState("");
  const [hasTimeLeft, setHasTimeLeft] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = initialTimestamp - now;
      setHasTimeLeft(timeLeft > 0);
      setCountdown(getCountdown(initialTimestamp));
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [initialTimestamp]);

  return { countdown, hasTimeLeft };
};

export const Countdown = ({ timestamp }) => {
  const { countdown, hasTimeLeft } = useCountdown(timestamp);
  return (
    <div className={`de_countdown ${hasTimeLeft ? "active" : ""}`}>
      {countdown}
    </div>
  );
};