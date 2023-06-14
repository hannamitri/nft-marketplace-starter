import { useEffect, useState } from "react";

const Timer = ({ nft }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!nft.expiryDate) return;
    const timer = setInterval(() => {
      let diff = nft.expiryDate - new Date().getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff %= 1000 * 60 * 60;
        const minutes = Math.floor(diff / (1000 * 60));
        diff %= 1000 * 60;
        const seconds = Math.floor(diff / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nft.expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>
;
};

export default Timer;
