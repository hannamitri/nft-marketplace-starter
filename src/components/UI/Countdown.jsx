
import React, { useEffect, useRef, useState } from 'react'

const formatTime = (time) => {
    let minutes = time / 60
    let hours = minutes / 60
    let secondsText = Math.floor(time) % 60
    let minutesText = Math.floor(minutes) % 60
    let hoursText = Math.floor(hours)
    return `${hoursText.toString().padStart(2, "0")} : ${minutesText.toString().padStart(2, "0")} : ${secondsText.toString().padStart(2, "0")}`
}

export default function Countdown(time) {
    const [count, setCount] = useState(Math.floor((time.time - Date.now()) / 100))
    const timer = useRef()
    useEffect(() =>{
      if(count === 0){
        clearInterval(timer.current)
      }
    },[count])

      useEffect(() => {
        timer.current = setInterval(() => {
          setCount(time => time - 1 )
        },1000)
        return () => clearInterval(timer.current)
      },[])
      
  return (
    count > 0 ? <div className="de_countdown">{formatTime(count)}</div> : <></>
  )
}
