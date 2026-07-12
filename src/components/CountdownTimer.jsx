import React, { useEffect, useState } from 'react'

const CountdownTimer = ({ expiryDate }) => {
    const [seconds, setSeconds] = useState();
    const [minutes, setMinutes] = useState();
    const [hours, setHours] = useState();

    function updateTime(expiryDate) {
        let timeDifference = expiryDate - Date.now();

        // If the time has run out, set all to 0 and stop updating
        if (timeDifference <= 0) {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            return; // Exit the function to prevent further calculations for negative time
        }

        let secondsLeft = (timeDifference / 1000);
        let minutesLeft = (secondsLeft / 60);
        let hoursLeft = (minutesLeft / 60);

        let secondText = Math.floor(secondsLeft % 60);
        let minuteText = Math.floor(minutesLeft % 60);
        let hourText = Math.floor(hoursLeft % 24); // Assuming you want hours within a 24-hour cycle if it goes beyond 24 hours

        setSeconds(secondText);
        setMinutes(minuteText);
        setHours(hourText);
    }

    useEffect(() => {
        // Initial call to set the time immediately
        updateTime(expiryDate);

        // Set up the interval
        const intervalId = setInterval(() => {
            updateTime(expiryDate);
        }, 1000);

        // Cleanup function: This will be called when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [expiryDate]); // Depend on expiryDate to restart the timer if it changes

    return (
        <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>
    );
};

export default CountdownTimer;