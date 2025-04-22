import React, { useState, useEffect } from 'react';

const Countdown = ({ expiryDate}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));
    const [expired, setExpired] = useState(false);

    function calculateTimeLeft(date) {
        const total = date - new Date().getTime();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / (1000 * 60)) % 60);
        const hours = Math.floor((total / (1000 * 60 *60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeLeft(expiryDate);

            if (remaining.total <= 0) {
                setExpired(true);
                clearInterval(timer);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate])


    if (expired) {
        return <div className='de_countdown'>Expired</div>
    }

    return (
        <div className='de_countdown'>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    );
};


export default Countdown
