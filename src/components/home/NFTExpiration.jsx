import React, { useEffect, useRef, useState } from "react";

const NFTExpiration = ({ nftObject }) => {
  const [timeLeft, setTimeLeft] = useState( calculateTimeLeft(nftObject.expiryDate));
  const requestRef = useRef();

  function calculateTimeLeft(targetDate) {
    const difference = targetDate - Date.now();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const animate = () => {
      setTimeLeft(calculateTimeLeft(nftObject.expiryDate));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [nftObject.expiryDate]);

  return (
    <div>
      {nftObject.expiryDate != null ? (
        Object.keys(timeLeft).length === 0 ? (
          <div>EXPIRED</div>
        ) : (
          <div>
            <div>
              { `${timeLeft.hours}h ` +
                `${timeLeft.minutes}m ` +
                `${timeLeft.seconds}s`}
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default NFTExpiration;
