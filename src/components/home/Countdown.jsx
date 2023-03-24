import React, { useEffect, useState } from "react";

function Countdown({ expiry }) {
  const [hrs, setHrs] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setSecs] = useState(0);

  function main() {
    setInterval(() => {
      const diff = expiry - Date.now();
      const sec = Math.floor(diff / 1000) % 60;
      setSecs(sec);

      const min = Math.floor(diff / 1000 / 60) % 60;
      setmins(min);

      const hr = Math.floor(diff / 1000 / 3600);
      setHrs(hr);
    }, 1000);
  }

  useEffect(() => {
    const diff = expiry - Date.now();
    const sec = Math.floor(diff / 1000) % 60;
    setSecs(sec);

    const min = Math.floor(diff / 1000 / 60) % 60;
    setmins(min);

    const hr = Math.floor(diff / 1000 / 3600);
    setHrs(hr);
    main();
  }, []);

  return (
    <div>
      {expiry && (
        <div className="de_countdown">
          {hrs}h {mins}m {secs}s
        </div>
      )}
    </div>
  );
}

export default Countdown;
