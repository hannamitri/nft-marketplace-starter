import React, {useState, useEffect} from "react";

function experationData(date) {
    const totalTimeLeft = date - Date.now();

    if (totalTimeLeft <= 0) return;

    const totalSeconds = Math.floor(totalTimeLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s` 
}


const TimeLeft = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(() => experationData(expiryDate));

    useEffect(() => {
        if(expiryDate - Date.now() <= 0) return;

        const intervalId = setInterval(() => {
            const updatedTime = experationData(expiryDate);
            setTimeLeft(updatedTime);
        
            if (updatedTime === "Expired") {
                clearInterval(intervalId);
            }
        
        }, 1000)

        return () => clearInterval(intervalId);
    }, [expiryDate])

    return <div className="de_countdown">{timeLeft}</div>;
}

export default TimeLeft