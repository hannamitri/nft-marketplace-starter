import React, {useEffect, useState} from "react";

const Countdown = ({expiryTime}) => {
  const [time, setTime] = useState(expiryTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(expiryTime - Date.now());
    }, 1000)

    return () => clearInterval(interval);
  }, [expiryTime])

  if (time <= 0) {
    return 'EXPIRED'
  }

  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    <>
    {`${hours}hr ${minutes}m ${seconds}s`}
    </>
  )
}

export default Countdown