import React, { useEffect, useState } from "react";

const Timer = (expiryDate) => {
  const [calcTime, setCalcTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      getTime();
    }, 0);
  }, []);

  function getTime() {
    const time = expiryDate.time - Date.now();
    if (time < 0) {
      return setCalcTime(null);
    } else {
      const seconds = Math.floor(time / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      setCalcTime(`${hours}h ${minutes % 60}m ${seconds % 60}s`)
    }
  }

  return <div>{calcTime}</div>;
};

export default Timer;
