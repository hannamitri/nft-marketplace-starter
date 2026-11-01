import React, { useEffect } from 'react'

const ExpirationDate = ({ expiryDate }) => {
  
  let timeLeft
  let expirationTime = '0h 0m 0s'
  
  function getTimeLeft(expiryDate) {    
    let time = Date.now()
    timeLeft = expiryDate - time
    if (timeLeft <= 0) {
      return (
        clearInterval(getTimeLeft)
      )  
    } 
    updateTime() 
  }

  function updateTime() { 
    let seconds = timeLeft / 1000
    let minutes = seconds / 60
    let hours = minutes / 60

    let secondsText ='0s'
    let minutesText ='0m'
    let hoursText = '0h'
    
    secondsText = Math.floor(seconds % 60) + 's'
    minutesText = Math.floor(minutes % 60) + 'm'
    hoursText = Math.floor(hours) + 'h'
    
    if (hours <= 0) {
      hoursText = '0h'
    }
    if (minutes <= 0) {
      minutesText = '0m'
    }
    
    expirationTime = hoursText + minutesText + secondsText    
  }

  useEffect(() => {
    setInterval(() => {
      getTimeLeft(expiryDate)
    }, 1000)
  // eslint-disable-next-line
  }, [])

  if(timeLeft <= 0 ) return null
  
  return <span>{expirationTime}</span> 
}

export default ExpirationDate
