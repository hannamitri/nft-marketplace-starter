import { useEffect, useState } from "react";

function ExpiryTimer({ expiryTime }) {
  const [remainingTime, setTime] = useState(sums(expiryTime));

  useEffect(() => {
    const reset = setInterval(() => {
      setTime(sums(expiryTime));
    }, 1000);

    return () => clearInterval(reset);
  }, [expiryTime]);

  if (remainingTime.total <= 0) {
    return <></>;
  }

  return (
    <div className="de_countdown">
      {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
    </div>
  );
}

const sums = (expiryTime) => {
  const total = expiryTime - Date.now();
  let remainingTime = {
    total: total,
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
  return remainingTime;
};

export default ExpiryTimer;
