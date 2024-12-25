import React from 'react'


export default function Impending({ timeLeft }) { // Accepts timeLeft as a prop
    const getFormattedTime = (milliseconds) => {
      if (milliseconds <= 0) return "";
  
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return ` ${hours}h ${minutes}m ${seconds}s`;
    };
  
    return <div>{getFormattedTime(timeLeft)}</div>;
    
}
