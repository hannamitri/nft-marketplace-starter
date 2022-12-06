import { useEffect, useState } from "react";
import getTimer from "../../utils/getTimer";

export default function Timer({ expirationDate }) {
  const [timer, setTimer] = useState("00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const timer = getTimer(expirationDate);
      setTimer(timer);
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  return <div>{timer}</div>;
}
