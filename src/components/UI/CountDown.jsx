
import React, { useState, useEffect } from "react";

export default function CountDown({ expiryDate }) {
  const [count, setCount] = useState();

  function getTime() {
    let ms = expiryDate - Date.now();
    
    let s = Math.floor(ms / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);

    setCount(`${h}h ${m % 60}m ${s % 60}s`);
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="de_countdown">{count}</div>;
}