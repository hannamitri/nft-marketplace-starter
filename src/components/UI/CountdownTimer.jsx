import React, { useEffect, useState } from 'react'

const CountdownTimer = ({expiryDate}) => {
    const [timeLeft, setTimeLeft] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const expiry = new Date(expiryDate)
            const difference = expiry - now 
            
            if (difference <= 0) {
                clearInterval(interval)
                return
            }
           

            const hours = Math.floor(difference / (1000 * 60 * 60))
            const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(difference % (1000 * 60) / 1000)

            const h = hours.toString().padStart(2, '0')
            const m = minutes.toString().padStart(2, '0')
            const s = seconds.toString().padStart(2, '0')

            setTimeLeft(`${h}h ${m}m ${s}s`)       
        }, 1000)

        return () => clearInterval(interval)
    }, [expiryDate])

  return (
    <div className='de_countdown'>{timeLeft}</div>
  )
}

export default CountdownTimer
