import React, { useEffect, useState } from "react";

export default function Clock({ time }) {
  const [timer, setTimer] = useState(false);

  function countDown() {
    requestAnimationFrame(countDown);
    let milliseconds = time - Date.now();

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 24);
    setTimer(
      milliseconds > 0 ? `${hours}h ${minutes % 60}m ${seconds % 60}s` : null
    );
  }

  useEffect(() => {
    requestAnimationFrame(countDown);
  }, []);
  return <div>{timer}</div>;
}
