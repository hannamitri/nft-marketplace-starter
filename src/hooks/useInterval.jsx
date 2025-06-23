import { useEffect, useState } from "react";

function useInterval() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return [now]
}

export default useInterval;
