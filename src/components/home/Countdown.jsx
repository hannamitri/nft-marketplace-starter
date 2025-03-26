import React, { useEffect, useState } from 'react'

const Countdown = ({expiryDate}) => {
const [intervalId, setIntervalId] = useState(null)
    useEffect(() => {
      updateTimer(); // if you want to make sure it runs on mount and not delayed after the interval is set to 1 second
  const id = setInterval(() => {
            updateTimer();
        }, 1000)
        setIntervalId(id)
        return () => {
            clearInterval(id)
        }
    }, [])
    const [time, setTime] = useState("")
    function updateTimer() {
        let countdownStart = expiryDate - Date.now()
        if (countdownStart < 0) {
            countdownStart = 0;
           clearInterval(intervalId);
            setTime("Expired")
            return;
        }
        let secondsLeft = countdownStart / 1000;
        let secondsText = Math.floor(secondsLeft) % 60;
        let minutesLeft = secondsLeft / 60;
        let hoursLeft = minutesLeft / 60;
        let minutesText = Math.floor(minutesLeft % 60);
        let hoursText = Math.floor(hoursLeft);
     setTime(`${hoursText}h ${minutesText}m ${secondsText}s`)
    }
    return (
        <div className="de_countdown">{time}</div>
      )
}

export default Countdown