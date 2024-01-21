import React, { useEffect, useState } from 'react'



function CountDown({ expiryDate }) {
    const [TimeLeftText, setTimeLeftText] = useState();
    const [intervalId, setIntervalId] = useState('');

    useEffect(() => {
        const intervalId = setInterval(msToTime, 1000);
        setIntervalId(intervalId);

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function msToTime() {

        const millisLeft = expiryDate - Date.now();

        if (millisLeft < 0) {
            clearInterval(intervalId);
            setTimeLeftText("EXPIRED");
            return;
        }

        let seconds = Math.floor((millisLeft / 1000) % 60),
            minutes = Math.floor((millisLeft / (1000 * 60)) % 60),
            hours = Math.floor((millisLeft / (1000 * 60 * 60)) % 24);


        setTimeLeftText(`${hours}h ${minutes}m ${seconds}s`);
    }
    return (
        <>
            {TimeLeftText}
        </>
    )
}

export default CountDown