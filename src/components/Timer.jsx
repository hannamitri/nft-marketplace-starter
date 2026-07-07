import React from 'react'
import {useState,useEffect} from "react"
export default function Timer({endTime}) {

    const calculateTimeLeft=()=>{
      const difference= new Date (endTime)-new Date();
      if (difference<=0) 
        return "Expired";
      const hours= Math.floor(difference/(1000*60*60));
      const minutes= Math.floor((difference % (1000*60*60))/(1000*60));
      const seconds= Math.floor((difference %(1000*60))/1000);
return `${hours}h ${minutes}m ${seconds}s`;
    };
    const [timeLeft ,setTimeLeft]= useState(calculateTimeLeft());
    useEffect(()=>{
      const interval=setInterval(()=>{
        setTimeLeft(calculateTimeLeft());
      },1000);
      return ()=>clearInterval(interval);
    }, [endTime]);
    return <span className="countdown-timer">{timeLeft}</span>;
  
    
}
