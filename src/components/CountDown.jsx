import { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(expiryDate);
    const diff = Math.max(0, end - now);

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.hours === 0 && updated.minutes === 0 && updated.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="countdown">
      {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </div>
  );
};

export default Countdown;