import React, { useEffect, useState } from "react";
export default function Countdown({ expiryDate }) {
  const [timeText, setTimeText] = useState(undefined);

  function timeConversion() {
    let timeLeft = expiryDate - Date.now();
    //  format: 5h 30m 32s
    if (timeLeft < 0) {
      setTimeText("EXPIRED");
    } else {
      let secLeft = Math.floor(timeLeft / 1000);
      let minLeft = Math.floor(secLeft / 60);
      let hourLeft = Math.floor(minLeft / 60);
      setTimeText(`${hourLeft}h ${minLeft % 60}m ${secLeft % 60}s`);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      timeConversion();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <span>{timeText}</span>;
}
