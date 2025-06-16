import { useEffect, useState } from "react";

const Time = ({ nft }) => {
  const [timeLeft, setTimeLeft] = useState({
    secondsLeft: 0,
    minutesLeft: 0,
    hoursLeft: 0,
    displayTimer: false,
    isExpired: false,
  });

  const updateTimer = () => {
    const expiryDate = new Date(nft.expiryDate);
    if (isNaN(expiryDate)) return;

    const millisLeft = expiryDate - Date.now();
    const displayTimer = millisLeft > 0;
    const isExpired = millisLeft <=0;

    setTimeLeft({
      secondsLeft: Math.floor(millisLeft / 1000) % 60,
      minutesLeft: Math.floor(millisLeft / (1000 * 60)) % 60,
      hoursLeft: Math.floor(millisLeft / (1000 * 60 * 60)),
      displayTimer,
      isExpired,
    });
  };

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nft.expiryDate]);

  return (
    <>
      {timeLeft.displayTimer ? (
        <div className="de_countdown">
          {`${timeLeft.hoursLeft}h ${timeLeft.minutesLeft}m ${timeLeft.secondsLeft}s`}
        </div>
      ) : timeLeft.isExpired ? (
        <div className="de_countdown">Expired</div>
      ) : null}
    </>
  );
};

export default Time;
