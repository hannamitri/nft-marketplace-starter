import React, { useState } from "react";

const Countdown = ({ expiryDate }) => {

    const [timerText, setTimerText] = useState("")
    const [intervalId, setIntervalId] = useState()

    React.useEffect(() => {
        calculateTime()
        
        const intervalId = setInterval(() => {
            calculateTime()
        }, 1000)
        
        setIntervalId(intervalId)
        
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    function calculateTime() {
        const milisLeft = expiryDate - Date.now()
    
        if (milisLeft < 0) {
            clearInterval(intervalId);
            setTimerText("EXPIRED");
            return;
        }

        const secondsLeft = milisLeft / 1000
        const minutesLeft = secondsLeft / 60
        const hoursLeft = minutesLeft / 60

        setTimerText(
            `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(secondsLeft % 60)}s`
        )
    }

    return <div className="de_countdown">{timerText}</div>
};

export default Countdown