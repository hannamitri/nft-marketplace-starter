import React from "react";
import { useEffect, useState } from "react";

export const Timer = ({ nft }) => {
  const [updatedNft, setUpdatedNft] = useState(nft);

  const updateTimer = () => {
    const millisRemain = new Date(updatedNft.expiryDate) - Date.now();
    const totalSecondsRemain = Math.floor(millisRemain / 1000);

    const secondsRemain = Math.floor(totalSecondsRemain % 60);
    const minutesRemain = Math.floor((totalSecondsRemain % 3600) / 60);
    const hoursRemain = Math.floor(totalSecondsRemain / 3600);

    const displayTimer = millisRemain > 0;

    setUpdatedNft((prevNft) => ({
      ...prevNft,
      secondsRemain,
      minutesRemain,
      hoursRemain,
      displayTimer,
    }));
  };

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {updatedNft.displayTimer && (
        <div className="de_countdown">
          {`${updatedNft.hoursRemain}h ${updatedNft.minutesRemain}m ${updatedNft.secondsRemain}s`}
        </div>
      )}
    </>
  );
};
