import React from "react";


const calculateTimeLeft = (expiryDate) => {
  const remainingMilliseconds = expiryDate - Date.now();

  if (remainingMilliseconds <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remainingMilliseconds / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = React.useState(() =>
    calculateTimeLeft(expiryDate)
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [expiryDate]);

  if (!expiryDate || !timeLeft) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default CountdownTimer;