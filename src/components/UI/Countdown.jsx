import React, { useState, useEffect } from "react"

export default function Counter({ expiryDate }){
    const [count, setCount] = useState()

    function countDown(){
        let milliseconds = expiryDate - Date.now()
        let seconds = Math.floor(milliseconds / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        setCount(`${hours}h ${minutes % 60}m ${seconds % 60}s`)
    }

    useEffect(() => {
        countDown()
        const timer = setInterval(() => {
            countDown()
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return <div className="de_countdown">{count}</div>
}