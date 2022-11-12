import React, { useEffect, useState } from 'react';

const Countdown = (expiryDate) => {
    const [timerText, setTimerText] = useState("")

    useEffect(() => {
     setInterval(() => {
        getTimer()
     }, 1000)   
    }, [])

    function getTimer(){
        const time = expiryDate.time - Date.now()
        if (time < 0){
         return setTimerText(null)
        }
        else {
        const seconds = Math.floor(time/1000)
        const minutes = Math.floor(seconds/60)
        const hours = Math.floor(minutes/60)

        setTimerText(`${hours}h ${minutes % 60}m ${seconds % 60}s`)
    }
}



    return (
        <div>
            {timerText}
        </div>
    );
}

export default Countdown;