import React from "react";

const getTimeLeft = (expiryDate) => {
    const diff = new Date(expiryDate).getTime() - Date.now();

    if (diff <= 0) {
        return null;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
};


const Countdown = React.memo(({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(expiryDate));


  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!timeLeft) return <div className="de_countdown ended">Ended</div>;

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
});

export default Countdown;