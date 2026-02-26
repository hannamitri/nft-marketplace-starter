import React, { useEffect, useState } from 'react'

const Countdown = ({ expiryDate }) => {
    const getTime = () => {
        if (!expiryDate) return null;

        const time = expiryDate - Date.now();

        if(time <= 0) return "Expired";

        const hours = Math.floor(time / 1000 / 60 / 60);
        const minutes = Math.floor(time / 1000 / 60) % 60;
        const seconds = Math.floor(time / 1000)  % 60;

        return `${String(hours).padStart(1, "0")}h ${String(minutes).padStart(1, "0")}m  ${String(seconds).padStart(2, "0")}s`
    }

    const [countdown, setCountdown] = useState(getTime);

    useEffect(() => {
        if (!expiryDate)
            return;

        const interval = setInterval(() => {
            const result = getTime();
            setCountdown(result);
            if (result === "Expired") clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [expiryDate]);

  return (
   countdown
  )
}

export default Countdown