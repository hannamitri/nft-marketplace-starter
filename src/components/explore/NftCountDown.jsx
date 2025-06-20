import React from "react";

function NftCountDown({ expiryDate }) {
  function getExpiryTime(time) {
    const remains = time - Date.now();
    if (remains <= 0) return "0s";

    const totalSeconds = Math.floor(remains / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(" ");
  }
  return <div className="de_countdown">{getExpiryTime(expiryDate)}</div>;
}

export default NftCountDown;
