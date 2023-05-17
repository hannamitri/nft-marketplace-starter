import React, { useEffect, useState } from 'react'

function Timer({expiryDate}) {

        const [second , setSecond] = useState(0)
        const [minute , setMinute] = useState(60)
    const [hour , setHour] = useState(0)



    useEffect(() => {
      setInterval(() => {
        updateTimer(expiryDate)
      }, 1000);
    }, [expiryDate])
    


function updateTimer (expiryDate){
   const remainingSeconds = expiryDate - Date.now()
   const remainingMinutes = remainingSeconds / 1000 / 60 
   const remainingHours = remainingSeconds / 1000 / 60 / 60 
   const secondsLeft = remainingSeconds / 1000  


   const hours = Math?.floor(remainingHours%60)

   
    const minutes =  Math?.floor(remainingMinutes%60)
  
   const seconds = Math?.floor(secondsLeft%60)

setHour(hours)
setMinute(minutes)
setSecond(seconds)
 

}





    // console.log(expiryDate.expiryDate)
  return (
    <div>
        <div className="de_countdown">{hour}h {minute}m {second}s</div>
    </div>
  )


  
}

export default Timer