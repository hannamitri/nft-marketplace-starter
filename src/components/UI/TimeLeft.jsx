import { useEffect } from "react";

const TimeLeft = ({ expiryDate, onFormatted }) => {
    useEffect(() => {
        if (
            typeof expiryDate !== "number" ||
            isNaN(expiryDate) ||
            expiryDate < 0
        ) {
            onFormatted("Invalid time");
            return;
        }

        let remaining = expiryDate - Date.now();

        // Function to format and send time
        const updateTime = () => {
            if (remaining <= 0) {
                onFormatted("00:00:00");
                clearInterval(timerId);
                return;
            }

            // Convert milliseconds to hours, minutes, seconds
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor(
                (remaining % (1000 * 60 * 60)) / (1000 * 60),
            );
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            // Format with leading zeros
            const formatted = [
                hours.toString().padStart(2, "0") + "h",
                minutes.toString().padStart(2, "0") + "m",
                seconds.toString().padStart(2, "0") + "s",
            ].join(" : ");

            // Send formatted string back to parent
            onFormatted(formatted);
            remaining -= 1000; // decrease by 1 second
        };

        // Initial call
        updateTime();

        // Update every second
        const timerId = setInterval(updateTime, 1000);

        // Cleanup on unmount
        return () => clearInterval(timerId);
    }, [expiryDate, onFormatted]);

    return null; // This component doesn't render anything itself
};

export default TimeLeft;
