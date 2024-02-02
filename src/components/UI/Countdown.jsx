import React, { useEffect, useState } from "react";

const Countdown = ({expiryDate}) => {
    const [countdownHours, setCountdownHours] = useState(0);
    const [countdownMinutes, setCountdownMinutes] = useState(0);
    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    let cancelId;

    useEffect(() => {
        startTimer();
      }, []);

    function startTimer() {
        cancelId = setInterval(updateCountdown, 1000/60);
    }
    
    function updateCountdown() {
        let countdown = expiryDate - Date.now();
        if (countdown < 0) {
            countdown = 0;
            setIsExpired(true);
            clearInterval(cancelId);
        }

        let secondsLeft = countdown / 1000;
        let minutesLeft = secondsLeft / 60;
        let hoursLeft = minutesLeft / 60;

        let secondsText = Math.floor(secondsLeft) % 60;
        let minutesText = Math.floor(minutesLeft) % 60;
        let hoursText = Math.floor(hoursLeft);
        
        setCountdownHours(hoursText);
        setCountdownMinutes(minutesText);
        setCountdownSeconds(secondsText);
    }

    return (
        !isExpired ? (
            <div className="de_countdown">
                <span>{countdownHours}</span>h
                <span>{countdownMinutes}</span>m
                <span>{countdownSeconds}</span>s
            </div>
        ) : (
            <div className="de_countdown">EXPIRED</div>
        )
    );
};

export default Countdown;