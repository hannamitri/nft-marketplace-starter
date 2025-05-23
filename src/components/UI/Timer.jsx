import React, {useEffect, useState} from 'react'

export default function Timer({duration}) {
    let timeLeft = (duration - Date.now())
    const [time, setTime] = useState(timeLeft)

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => {
                setTime(time - 1000)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [time])

    function getFormattedTime() {
        let total_seconds = Math.floor(time / 1000);
        let total_minutes = Math.floor(total_seconds / 60);
        let total_hours = Math.floor(total_minutes / 60);

        let seconds = parseInt(total_seconds % 60)
        let minutes = parseInt(total_minutes % 60)
        let hours = parseInt(total_hours % 24)

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    return (
        <>
            {getFormattedTime()}
        </>
    );
}

