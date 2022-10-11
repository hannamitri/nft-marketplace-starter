import React, { useState, useEffect } from "react";

const Countdown = (expiryDate) => {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    setInterval(() => {
      convertTime();
    }, 1000);
  }, []);

  const convertTime = () => {
    let newTime = expiryDate.time - Date.now();
    if (newTime < 0) {
      return setTimeText("EXPIRED");
    }
    let seconds = Math.floor(newTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    setTimeText(`${hours}h ` + `${minutes % 60}m ` + `${seconds % 60}s`);
  };

  return <div>{timeText}</div>;
};

export default Countdown;
