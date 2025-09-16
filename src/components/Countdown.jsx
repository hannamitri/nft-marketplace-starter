import React, { useEffect, useRef, useState } from 'react'

export default function Countdown({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());
    const frameRef = useRef(null);

    const formatTime = (ms) => {
        if (ms <= 0) return "0h 00m 00s";

        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
    };

    const updateTimer = () => {
        const remaining = expiryDate - Date.now();
        setTimeLeft(remaining);
        if (remaining > 0) {
            frameRef.current = requestAnimationFrame(updateTimer);
        }
    };

    useEffect(() => {
        frameRef.current = requestAnimationFrame(updateTimer);
        return () => cancelAnimationFrame(frameRef.current);
    }, [expiryDate]);

  return (
    <div className="countdown-badge">
        {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
    </div>
  );
}


