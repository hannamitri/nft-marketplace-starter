import React, { useState, useEffect, useCallback } from "react";


function CountDownTimer({startTime})
{

    const [countdownTime, setCountdownTime] = useState("");

    const countDown = useCallback(() => {
        if (!startTime) {
            // Handle the case when no start time is available
            return;
        }

        const countDownDate = new Date(startTime).getTime(); // Convert the start time to Unix format

        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance <= 0) {
            setCountdownTime("EXPIRED");
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timeString = `${hours}h ${minutes}m ${seconds}s`;
        setCountdownTime(timeString);
    }, [startTime]);

    useEffect(() => {
        const countdownInterval = setInterval(countDown, 1000);
        return () => clearInterval(countdownInterval);
    }, [countDown]);


    return (
        <div className="de_countdown">{countdownTime}</div>
    )
}

export default CountDownTimer;