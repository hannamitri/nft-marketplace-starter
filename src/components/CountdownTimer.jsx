import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiry }) => {
  const calculateTimeLeft = () => {
    const diff = expiry - Date.now()
    return diff > 0
      ? {
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      }
      : { h: 0, m: 0, s: 0}
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [expiry])

  if (timeLeft.h === 0 && timeLeft.m === 0 && timeLeft.s === 0) return null

  return (
    <div className="de_countdown">
      {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
    </div>
  )
}

export default CountdownTimer