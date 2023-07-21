import React, { useEffect, useState } from "react";

function Timer({ timeLeft }) {
  const [text, setText] = useState("");
  let timeInterval;

  timeInterval = setInterval(() => {
    getTimeLeft();
  }, 1000);

  function getTimeLeft() {
    const expiryDate = timeLeft - Date.now();

    if (expiryDate < 0) {
      clearInterval(timeInterval);
      setText("EXPIRED");
      return;
    }

    const seconds = Math.floor(expiryDate / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    setText(`${hours % 24}h ${minutes % 60}m ${seconds % 60}s`);
  }

  return <div className="de_countdown">{text}</div>;
}

export default Timer;
