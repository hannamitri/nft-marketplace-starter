// const seconds =  Math.floor(Math.abs((Date.now() - expiryDate) / 1000));
//     const hrs = seconds/3600
//     const mins = Math?.round((seconds % 3600)/60)

import React, { useEffect, useState } from 'react'

function Timer({expiryDate}) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(60);
    const [hours, setHours] = useState(0);

useEffect(()=>{
    setInterval(() => {
        updateTimer(expiryDate);
      }, 1000);
},[expiryDate])

function updateTimer(expiryDate) {
    const timeRemaining = expiryDate - Date.now();

    const secondsLeft = timeRemaining / 1000;
    const minutesLeft = timeRemaining / 1000 / 60;
    const hoursLeft = timeRemaining / 1000 / 60 / 60;

    const secondsText = Math.floor(secondsLeft % 60);
    const minutesText = Math.floor(minutesLeft % 60);
    const hoursText = Math.floor(hoursLeft % 60);

    setHours(hoursText);
    setMinutes(minutesText);
    setSeconds(secondsText);
  }


  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

export default Timer