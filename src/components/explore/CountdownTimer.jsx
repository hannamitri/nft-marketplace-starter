import { useEffect, useState } from "react";

function getTimeRemaining(endTime) {
  const total = endTime - Date.now();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / (1000 * 60 * 60));

  return { total, hours, minutes, seconds };
}

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining(endTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  // Hide timer if expired
  if (timeLeft.total <= 0) return null;

  const format = (num) => String(num).padStart(2, "0");

  return (
    <span>
      {format(timeLeft.hours)}h{" "}
      {format(timeLeft.minutes)}m{" "}
      {format(timeLeft.seconds)}s
    </span>
  );
};

export default CountdownTimer;