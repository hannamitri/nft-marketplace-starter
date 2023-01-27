import React, { useEffect, useState } from "react";

const ExpiryDate = ({ item }) => {
  const [dateFormat, setDateFormat] = useState("");

  const expiryDate = item.expiryDate - Date.now();
  const expiryHours = Math.floor(expiryDate / 1000 / 60 / 24);

  const expiryMinutes = Math.floor(expiryDate / 1000 / 60) - expiryHours * 24;

  const expirySeconds =
    Math.floor(expiryDate / 1000) -
    (expiryMinutes * 60 + expiryHours * 24 * 60);

  useEffect(() => {
    let [seconds, minutes, hours] = [expirySeconds, expiryMinutes, expiryHours];

    function displayTimer() {
      seconds--;
      if (seconds === -1) {
        seconds = 59;
        minutes--;
        if (minutes === -1) {
          minutes = 59;
          hours--;
        }
      }
      setDateFormat(`${hours}h ${minutes}m ${seconds}s `);
    }

    let _ = setInterval(displayTimer, 1000);
  }, []);

  return <div className="de_countdown">{dateFormat}</div>;
};

export default ExpiryDate;
