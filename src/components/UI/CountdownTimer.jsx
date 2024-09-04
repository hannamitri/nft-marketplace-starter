import React, { useEffect, useState } from 'react'

const CountdownTimer = ({ expirationDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expirationDate));
    
    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(expirationDate))
        }, 1000)

        return () => clearInterval(timer);

    }, [expirationDate]);

    if (timeLeft.total <= 0) {
        return <></>;
    }
    
    
    return (
        <div className="de_countdown">{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</div>
    );
};

    const calculateTimeLeft = (expirationDate) => {
    const difference = expirationDate - new Date().getTime();

    let timeLeft = {
        total: difference,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
};

export default CountdownTimer;