import React, {useState, useEffect} from 'react'

const ReusableItemsCountdown = ({ expiryDate }) => {
  
  const [currentTime, setCurrentTime] = useState(Date.now());  
  
  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 1000)
  
      return () => clearInterval(interval)
    }, [])

    const getTimeRemaining = () => {
    const difference = expiryDate - currentTime;

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));

    const minutes = Math.floor(
      (difference % (1000* 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor (
      (difference % (1000 * 60)) / 1000
    );

    return `${hours}h ${minutes}m ${seconds}`;
  };

    if (!expiryDate) {
        return null;
    }

  return (
    <div className='de_countdown'>
        {getTimeRemaining()}
    </div>
  )
}

export default ReusableItemsCountdown
