import React, { useEffect, useState } from "react";

function Countdown({item}) {
    const [timeNow, setTimeNow] = useState(Date.now());

    const [secs, setSecs] = useState()
    const [mins, setMins] = useState()
    const [hours, setHours] = useState()

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
            {`${hours}h ${mins}m ${secs}s`}
        </div>
    )
}

export default Countdown