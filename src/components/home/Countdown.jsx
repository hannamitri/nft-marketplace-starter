import React, {useEffect, useState} from "react";

const Countdown = ({endTime}) => {
    const calculateTimeLeft = () => {
        let difference = +new Date(endTime * 1000) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    return (
        <div className='de_countdown'>
            {timeLeft.hours ? `${timeLeft.hours}h ` : ""}
            {timeLeft.minutes ? `${timeLeft.minutes}m ` : ""}
            {timeLeft.seconds ? `${timeLeft.seconds}s` : ""}
        </div>
    );
};

export default Countdown;
