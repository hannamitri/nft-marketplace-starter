import React, { useState, useEffect } from "react";

export default function Counter({ item }) {
  const [time, setTime] = useState(Date.now());

  const [second, setSecond] = useState();
  const [minute, setMinute] = useState();
  const [hour, setHour] = useState();

  function displayCounter() {
    const remainingMs = item.expiryDate - time;
    if (remainingMs < 0) {
      setSecond(0);
      setMinute(0);
      setHour(0);
      return;
    }
    setSecond(Math.floor(remainingMs / 1000) % 60);
    setMinute(Math.floor(remainingMs / (1000 * 60)) % 60);
    setHour(Math.floor(remainingMs / (1000 * 60 * 60)));
  }

  useEffect(() => {
    displayCounter();
    setTimeout(() => {
      setTime(Date.now());
    }, 1000);
  }, [time]);

  return <div className="de_countdown">{`${hour}h ${minute}m ${second}s`}</div>;
}
