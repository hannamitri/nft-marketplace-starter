import React, { useEffect, useState } from 'react'

const Countdown = ({expiryDate}) => {
    const [expiryTime, setExpiryTime] = useState("")
    const [timeRemaining, setTimeRemaining] = useState()
    

    useEffect(() => {
        timeLeft()
        const timeRemaining = setInterval(() => {
            timeLeft()
        }, 1000)
            setTimeRemaining(timeRemaining)
            
        return() => {
            clearInterval(timeRemaining)
        }
    }, [])

    function timeLeft(){
        const totalTime = expiryDate - Date.now()

        if (totalTime < 0){
            clearInterval(timeRemaining)
            setExpiryTime("...")
            return
        }
        else{
        const secondsLeft = Math.floor(totalTime / 1000)
        const minutesLeft = Math.floor(secondsLeft / 60 % 60)
        const hoursLeft = Math.floor(secondsLeft / 60 / 60 )

        setExpiryTime(`${hoursLeft.toFixed(0)}h ${minutesLeft.toFixed(0)}m ${(secondsLeft % 60).toFixed(0)}s`)}
    }

    

    return <div className="de_countdown">{expiryTime}</div>
}




// export default Countdown

// import React, { useState } from 'react'
// import { useEffect } from 'react'

// function Countdown({ expiryDate }) {
//     const [text, setText] = useState(undefined)


//     useEffect(() => {
//         setInterval(() => {
//             convertTime()
//         })
//     }, [])

//     function convertTime(){
//         const timeLeft = expiryDate - Date.now()
//         if (timeLeft < 0){
//             setText(undefined)
//         }
//         else{
//             const seconds = Math.floor(timeLeft / 1000)
//             const minutes = Math.floor(seconds / 60 % 60)
//             const hours = Math.floor(seconds / 60 / 60)

//             setText(`${hours.toFixed(0)}h ${minutes.toFixed(0)}m ${(seconds % 60).toFixed(0)}s `)
//         }

//     }

//   return (
//     <span>
//       {text}
//     </span>
//   )
// }

export default Countdown