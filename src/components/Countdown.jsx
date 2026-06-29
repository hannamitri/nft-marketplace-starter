import React, { useEffect, useState } from 'react'

const Countdown = ({expiryDate}) => {

       const [now, setNow] = useState(Date.now());
    
        useEffect(() => {
          const timer = setInterval(() => {
            setNow(Date.now());
          }, 1000);
    
          return () => clearInterval(timer);
        }, []);
    
      const formatTime = (expiryDate) => {
    
        const timeLeft = expiryDate - now;
    
        const totalSeconds = Math.floor(timeLeft / 1000);
    
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor(totalSeconds / 3600);
        
    
        const mDisplay = String(minutes).padStart(2, '0');
        const sDisplay = String(seconds).padStart(2, '0');
    
        if (timeLeft <= 0) {
          return null;
        }
    
        return `${hours}h ${mDisplay}m ${sDisplay}s `; 
    };

    return <>{formatTime(expiryDate)}</>;

}

export default Countdown