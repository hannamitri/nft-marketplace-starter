import React, {useState, useEffect} from 'react';

const Countdown = ({ expiryDate }) => {
    const calculateTimeLeft = () => {
       
        const difference = expiryDate - new Date();
        let timeLeft = {};

        if(difference > 0){
            timeLeft= {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000)  % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, SetTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
           SetTimeLeft(calculateTimeLeft(timer)) 
        }, 1000);

        return () => clearTimeout(timer)
    });

    return (
        <div>
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    )
};

export default Countdown