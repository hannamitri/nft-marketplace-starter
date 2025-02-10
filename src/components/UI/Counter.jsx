import React from "react";

const Counter = ({ itemExpiryDate }) => {

  // Countdown formatting function in seconds
  const Counter = (endTimeMilliseconds) => {
    const currentTime = Date.now()
    const timeRemaining = Math.max(0, endTimeMilliseconds - currentTime);
    const timeInSeconds = Math.floor(timeRemaining / 1000);
    
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };



  return (
    <>
                            <div className="de_countdown"> 
                          {itemExpiryDate ? Counter(itemExpiryDate) : "Expired"} 
                          </div>
    
    </>
  );
};

export default Counter;
