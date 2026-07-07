import React, { useEffect, useState } from 'react'

function Timer ({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryDate))

  function getTimeLeft (date) {
    if (!date) return 0
    return Math.max(Math.floor((date - Date.now()) / 1000), 0)
  }

  function formatCountdown (seconds) {
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [hours ? `${hours}h` : null, `${minutes}m`, `${secs}s`]
      .filter(Boolean)
      .join(' ')
  }

  useEffect(() => {
    setTimeLeft(getTimeLeft(expiryDate))
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [expiryDate])

  return (
    <div className='de_countdown'>
      {timeLeft > 0 ? formatCountdown(timeLeft) : 'Expired'}
    </div>
  )
}

export default Timer
