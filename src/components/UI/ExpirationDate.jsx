import { useEffect, useState } from "react";

const ExpirationDate = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    () => Math.max(0, Number(expiryDate) - Date.now())
  );

  useEffect(() => {
    const updateTime = () => {
      setTimeLeft(Math.max(0, Number(expiryDate) - Date.now()));
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft <= 0) return null;

  const seconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span>
      {hours}h {minutes}m {remainingSeconds}s
    </span>
  );
};

export default ExpirationDate;