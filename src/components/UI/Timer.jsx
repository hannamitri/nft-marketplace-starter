import React, { useEffect, useState } from "react";

function Timer({ nftInfo })
{
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const [hours, setHours] = useState()

    function updateTimer()
    {
        let startTime = Date.now()
        let time = nftInfo - Date.now()

        let seconds = time / 1000
        let minutes = seconds / 60
        let hours = minutes / 60

        let secondsText = Math.floor(seconds % 60)
        let minutesText = Math.floor(minutes % 60)
        let hoursText = Math.floor(hours % 60)

        setSeconds(secondsText)
        setMinutes(minutesText)
        setHours(hoursText)
    }

    useEffect(() => 
    {
        setInterval(() =>
        {
            updateTimer()
        }, 1000)
    })

    return (
        <>
        {
            nftInfo && <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>
        }
        </>
    )
}

export default Timer

