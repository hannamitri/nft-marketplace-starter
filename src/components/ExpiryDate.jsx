import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ExpiryDate = ({ expiryDate }) => {
  const [expired, setExpired] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    expireTime();
    const time = setInterval(() => {
      expireTime();
    }, 1000);
    setTime(time);
    return () => {
      clearInterval(time);
    };
  }, []);

  function expireTime() {
    const millis = expiryDate - Date.now();

    if (millis < 0) {
      clearInterval(time);
      setExpired("Expired");
      return;
    }
    const seconds = millis / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    setExpired(
      `${Math.floor(hours)}h
            ${Math.floor(minutes % 60)}m
            ${Math.floor(seconds) % 60}s`
    );
  }
  return <div className="de_countdown">{expired}</div>;
};

export default ExpiryDate;
