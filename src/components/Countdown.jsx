import React, { useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [time, setTime] = useState("");
  const [intervaId, setIntervalId] = useState();

  React.useEffect(() => {
    calculateTime();
  }, 1000);
  }

  function calculateTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTime("EXPIRED");
      return;
      
    }
  }
  return <div>Countdown</div>;
}

export default Countdown;
