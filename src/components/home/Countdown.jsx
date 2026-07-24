import React, { useEffect } from 'react'
import { useState } from 'react';



const Countdown = (props) => {

    const [remainingTime, setRemainingTime] = useState("");

    /*function getTime(){
        if(props.expiryDate){

            timeLeft = props.expiryDate - Date.now();
            
            let milli = timeLeft % 1000;
            let sec = Math.floor(timeLeft/1000)%60;
            let min = Math.floor(timeLeft/1000/60)%60;
            let hour = Math.floor(timeLeft/1000/60/60);
            
            if(milli/10 < 1){
                milli = "00" + milli;
            }
            else if(milli/100 < 1){
                milli = "0" + milli;
            }
            
            if(sec/10 < 1){
                sec = "0" + sec;
            }

            if(min/10 < 1){
                min = "0" + min;
            }
            
            let timeString = hour + "h " + min + "m " + sec + "s ";
            
            setRemainingTime(timeString);
        }
    }*/

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(props.expiryDate){

            let timeLeft = props.expiryDate - Date.now();
            
            let milli = timeLeft % 1000;
            let sec = Math.floor(timeLeft/1000)%60;
            let min = Math.floor(timeLeft/1000/60)%60;
            let hour = Math.floor(timeLeft/1000/60/60);
            
            if(milli/10 < 1){
                milli = "00" + milli;
            }
            else if(milli/100 < 1){
                milli = "0" + milli;
            }
            
            if(sec/10 < 1){
                sec = "0" + sec;
            }

            if(min/10 < 1){
                min = "0" + min;
            }
            
            let timeString = hour + "h " + min + "m " + sec + "s ";
            
            setRemainingTime(timeString);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [props.expiryDate])

    return (
        <>
            {props.expiryDate?
                <div className="de_countdown">{remainingTime}</div>
                :
                <>
                </>
            }
        </>
    )

}

export default Countdown