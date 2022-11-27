import React, { useState } from 'react'
import { useEffect } from 'react'

function Timer({ expiryDate }) {
    const [text, setText] = useState(undefined)


    useEffect(() => {
        setInterval(() => {
        convertTime()
        })
    }, [])

    function convertTime(){
        const timeLeft = expiryDate - Date.now()
        if (timeLeft < 0){
            setText(undefined)
        }
        else{ 
            const seconds = Math.floor(timeLeft / 1000)
            const minutes = Math.floor(seconds / 60 % 60)
            const hours = Math.floor(seconds / 60 / 60)

            setText(`${hours.toFixed(0)}h ${minutes.toFixed(0)}m ${(seconds % 60).toFixed(0)}s `)
        }

    } 

  return (
    <span>
      {text}
    </span>
  )
} 

export default Timer