import React, { useEffect, useState } from 'react'

const CountDown = ({ expiryDate }) => {
    const [timeText, setTimeText ] = useState("");
    const [intervalId, setIntervalId] = useState();

    useEffect(() => {
        calculateTime();

        const intervalId = setInterval(() => {
            calculateTime();
        }, 1000);

        setIntervalId(intervalId);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function calculateTime() {
        const millSecLeft = expiryDate - Date.now();

        if (millSecLeft < 0) {
            clearInterval(intervalId);
            setTimeText("EXPIRED");
            return;
        }

    const secLeft = millSecLeft / 1000;
    const minLeft = secLeft / 60;
    const hoursLeft = minLeft / 60;

    setTimeText(
        `${Math.floor(hoursLeft)}h ${Math.floor(minLeft % 60)}m ${Math.floor(secLeft % 60)}s`
    );
}

  return (
    <div className='de_countdown'>{timeText}</div>
  );
};

export default CountDown
