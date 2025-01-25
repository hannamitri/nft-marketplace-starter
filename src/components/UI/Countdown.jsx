import React, { useEffect } from 'react';

const Countdown = ({item, data, setData}) => {

    useEffect(() => {
        const interval = setInterval(() => {
          setData((prevData) =>
            prevData.map((item) => ({
              ...item,
              timer: calculateTimer(item.expiryDate),
            }))
          );
        }, 1000);
    
        return () => clearInterval(interval);
      }, [data]);

      const calculateTimer = (expiryDate) => {
        const currentTime = Date.now();
        const timeLeft = expiryDate - currentTime;
    
        if (timeLeft <= 0) {
          return { expired: "Expired" };
        }
    
        const sec = Math.floor(timeLeft / 1000) % 60;
        const min = Math.floor(timeLeft / (1000 * 60)) % 60;
        const hrs = Math.floor(timeLeft / (1000 * 60 * 60));
    
        return { sec, min, hrs, expiryDate };
      };

    const timeLeft = item.timer || calculateTimer(item.expiryDate);
    return (
        <>
            {Date.now() < item.expiryDate && (
                <div className="de_countdown">
                    {timeLeft.expired
                    ? timeLeft.expired
                    : `${timeLeft.hrs}h ${timeLeft.min}m ${timeLeft.sec}s`}
                </div>
            )}
        </>
    );
}

export default Countdown;
