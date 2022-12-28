import React, { useEffect, useState } from "react";

function Countdown({item}) {    
    const [timeNow, setTimeNow] = useState(Date.now());

    const [secs, setSecs] = useState(0)
    const [mins, setMins] = useState(0)
    const [hours, setHours] = useState(0)

    function displayCount() {
        const secsRemaining = Math.floor((item.expiryDate - timeNow) / 1000)
        setHours(Math.floor(secsRemaining / 3600))
        setMins((Math.floor((secsRemaining % 3600) / 60)))
        setSecs(secsRemaining % 60)
    }

    useEffect(() => {
        displayCount()
        setTimeout(() => {
          setTimeNow(Date.now())
        }, 1000);
    }, [timeNow])

    return (
        <div className="de_countdown">
            {
                secs > 0 && mins > 0 && hours > 0
                &&
                `${hours}h ${mins}m ${secs}s`}
        </div>
    )
}

export default Countdown