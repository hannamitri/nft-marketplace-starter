import React, { useEffect, useState } from 'react';


const Timer = ({ endTimeInput }) => {

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [output, setOutput] = useState("");

  function getTime () { 
    const remaningTime = endTimeInput - Date.now();
    if (remaningTime > 0) {
      setSec( 
        Math.floor((remaningTime / 1000) % 60)
          .toString()
          .padStart(2, "0")
      )
      setMin ( 
        Math.floor((remaningTime / 60000) % 60)
          .toString()
          .padStart(2, "0")
      )
      setHour( 
        Math.floor((remaningTime / 3600000))
          .toString()
      )
      setOutput(`${hour}h ${min}m ${sec}s`);
    } else {
      setOutput('Expired');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(endTimeInput), 1000);

    return () => clearInterval(interval);
  })

   return (
    <>
      {output}
    </>
  );
}

export default Timer;
