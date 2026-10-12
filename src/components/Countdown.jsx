import { useState, useEffect } from "react";

function Countdown({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState(
        Math.max(0, Number(expiryDate) - Date.now())
    );

    useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(
            Math.max(0, Number(expiryDate) - Date.now())
        );
    }, 1000);

    return () => clearInterval(timer);
}, [expiryDate]);

const totalSeconds = Math.floor(timeLeft / 1000);

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

    return (
    <div className="de_countdown">
        {hours}h {minutes}m {seconds}s
    </div>
);
}

export default Countdown;