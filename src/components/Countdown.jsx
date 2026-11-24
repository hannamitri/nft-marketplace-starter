import { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = Number(expiryDate) - Date.now();

    if (!Number.isFinite(difference) || difference <= 0) {
      return "Expired";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor((difference / 1000) % 60);

    return days > 0
      ? `${days}d ${hours}h ${minutes}m ${seconds}s`
      : `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="de_countdown">
      {timeLeft}
    </div>
  );
};

export default Countdown;