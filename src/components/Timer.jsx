import React, { useState, useEffect, useRef } from "react";

const Timer = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration - Date.now());
    const frameRef = useRef();

    const formatTime = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = totalSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const updateTimer = () => {
        const remainingTime = duration - Date.now();
        setTimeLeft(remainingTime);

        if (remainingTime > 0) {
            frameRef.current = requestAnimationFrame(updateTimer);
        }
    };

    useEffect(() => {
        frameRef.current = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(frameRef.current);
    }, [duration]);

    return <div>{formatTime(timeLeft)}</div>;
};

export default Timer;

