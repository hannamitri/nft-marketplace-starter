import React, { useEffect, useState } from 'react'

export default function Countdown({expiryTime}) {
     const [timeLeft, setTimeLeft] = useState(expiryTime);
     useEffect(() => {
        if (timeLeft <= 0) return 
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if  (prev <= 1000) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1000
            })
        }, 1000) 
        return () => clearInterval(interval)
        },[timeLeft])
     function formatTime (ms) {
        const totalSeconds = Math.floor(ms / 1000)
        const hours = Math.floor(totalSeconds % (60 * 60 * 24) / 3600).toString().padStart(2, "0")
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0")
        const seconds = (totalSeconds % 60).toString().padStart(2, "0")
        return `${hours}h ${minutes}m ${seconds}s`
     }
  return (
    <div className="de_countdown">{formatTime(timeLeft)}</div>
  )
}

