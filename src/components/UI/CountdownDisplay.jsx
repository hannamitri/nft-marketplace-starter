import { useEffect, useState } from "react";

const CountdownDisplay = ({ expiryDate }) => {
    const [displayHoursMinutesSeconds, setDisplayHoursMinutesSeconds] = useState("");

    useEffect(() => {

        const expirationTime = new Date(expiryDate).getTime();
        let cancelId;

        function updateCountdown() {
            const currentTime = Date.now();
            const timeDistance = expirationTime - currentTime;
            if (timeDistance < 0) {
                setDisplayHoursMinutesSeconds("EXPIRED");
                return;
            }
            const hours = Math.floor((timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);
            setDisplayHoursMinutesSeconds(`${hours}h ${minutes}m ${seconds}s`);
            cancelId = requestAnimationFrame(updateCountdown);
        }

        updateCountdown();
        return () => {
            if (cancelId) {
                cancelAnimationFrame(cancelId);
            }
        };

    },[expiryDate]);

    return displayHoursMinutesSeconds;
  };

export default CountdownDisplay