import React, { useState } from 'react'

export default function TimeCalcu({expiry}) {
    let cancelId;
    let startTime = 0;
    let timeLeft = expiry - Date.now();

    const [timeText, setTimeText] = useState("");
    

    startTime = Date.now();
    cancelId = requestAnimationFrame(updateTimer);
    
    

    function updateTimer() {
      let millisElapsed = Date.now() - startTime;
      let millisLeft = timeLeft - millisElapsed;
      if (millisLeft < 0) {
        millisLeft = 0;
        cancelAnimationFrame(cancelId);
        cancelId = null;
      }
      let secondsLeft = millisLeft / 1000;
      let minutesLeft = secondsLeft / 60;
      let hoursLeft = minutesLeft / 60;

      let secondsText = Math.floor(secondsLeft % 60);
      let minutesText = Math.floor(minutesLeft % 60);
      let hoursText = Math.floor(hoursLeft);

      if (cancelId) {
        cancelId = requestAnimationFrame(updateTimer);
      }
      let unmounted = false

      if(!unmounted){
      setTimeText(`${hoursText}h ${minutesText}m ${secondsText}s`)}
    
    return()=>{
        unmounted = true
    }
}
return <div className="de_countdown">{timeText}</div>;
}
