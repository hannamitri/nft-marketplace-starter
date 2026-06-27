import React, { useEffect, useState } from "react";
import updateTime from "../home/CountdownTimer.js"

function Countdown({ expiryDate }) {
  const [time, setTime] = useState(updateTime(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(updateTime(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);
  
  return <div className="de_countdown">{time}</div>;
}

export default Countdown;
