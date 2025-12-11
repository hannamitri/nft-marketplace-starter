import React from 'react'
import { useCountDown } from '@reactuses/core'


function Countdown({expiryDate}) {
    const date = Date.now()
    const diff = Math.floor((expiryDate - date) / 1000);  
    const [hour, minute, second] = useCountDown(diff);


  return (
    <div className="de_countdown">
        {hour.toString() <= '00' ? 
        `${minute}m ${second}s`: 
        `${hour}h ${minute}m ${second}s`}</div>
   
  )
}

export default Countdown