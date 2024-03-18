import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = new Date(targetDate).getTime() - now.getTime();
            if (distance < 0) {
                clearInterval(interval);
                setCountdown("00:00:00");
                return;
            }

            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown(
                `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return countdown;
};

export default useCountdown;