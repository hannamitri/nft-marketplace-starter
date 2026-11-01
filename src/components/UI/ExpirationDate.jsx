import { useEffect, useState } from "react"

const ExpirationDate = ( expiryDate ) => {
  const expiringIn = document.querySelector('.de_countdown')
  const [loading, setLoading] = useState(true)

  if (!!expiryDate) {
    setLoading(false)
  }
  
  let time
  let timeLeft
  let cancelId
  let expirationTime = '0h 0m 0s'
  
  function getTimeLeft(expiryDate) {
    
    time = Date.now()
    timeLeft = expiryDate - time

    console.log(timeLeft)

    if (loading || timeLeft <= 0) {
      return (
        expiringIn.innerHTML = '0h 0m 0s',
        expiringIn.style.display= 'none',
        cancelAnimationFrame(cancelId)
      )     
    }
  
    cancelId = requestAnimationFrame(updateTime)
  }

  let secondsText ='0s'
  let minutesText ='0m'
  let hoursText = '0h'

  function updateTime() { 
    let seconds = timeLeft / 1000
    let minutes = seconds / 60
    let hours = minutes / 60
    
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
    
    cancelId = requestAnimationFrame(updateTime)      
  }
  
  useEffect(() => {
    getTimeLeft(expiryDate)
  // eslint-disable-next-line  
  }, [])

  return expiringIn.innerHTML = expirationTime
}

export default ExpirationDate
