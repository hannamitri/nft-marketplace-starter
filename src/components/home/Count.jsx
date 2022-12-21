import { useEffect } from "react";
import { useState } from "react";

const Count = (expiryDate) => {
  const [screen, setScreen] = useState("");

  useEffect(() => {
    setInterval(() => {
      numCounter();
    }, 0);
  }, []);

  function numCounter() {
    const timeNow = expiryDate.time - Date.now();
    if (timeNow < 0) return setScreen(null);
    else {
      const sec = Math.floor(timeNow / 1000);
      const min = Math.floor(sec / 60);
      const hours = Math.floor(min / 60);

      setScreen(`
      ${hours}h 
      ${min % 60}m 
      ${sec % 60}s
      `);
    }
  }

  return <div>{screen}</div>;
};

export default Count;
