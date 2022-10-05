import React, { useEffect, useState } from 'react'

const ExpiryDate = ({expiryDate}) => {
    const [expired, setExpired] = useState("")
    const [time, setTime] = useState()

    useEffect(() => {
        calcTime()
        const time = setInterval(() => {
            calcTime()
        }, 1000)

        setTime(time)

        return () => {
            clearInterval(time)
        }
    }, [])

    function calcTime(){
        const millisLeft = expiryDate - Date.now()

        if (millisLeft < 0){
            clearInterval(time)
            setExpired("Expired")
            return
        }
        const secondsLeft = millisLeft / 1000
        const minutesLeft = secondsLeft / 60
        const hoursLeft = minutesLeft / 60

        setExpired(
            `${Math.floor(hoursLeft)}h 
                ${Math.floor(minutesLeft % 60)}m 
                ${Math.floor(secondsLeft % 60)}s 
            `
        )
    }

    return <div className="de_countdown">{expired}</div>
}

export default ExpiryDate
