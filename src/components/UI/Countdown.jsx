import React from 'react';

function Countdown({item}) {
    const timeRemaining = Math.floor((item.expiryDate - Date.now())/1000)
    const hours = Math.floor(timeRemaining/3600);
    const mins = Math.floor((timeRemaining%3600)/60);
    const secs = timeRemaining%60;
    return (
        <div className="de_countdown">
            {
               item.expiryDate - Date.now() > 0
                &&
                `${hours}h ${mins}m ${secs}s`
           }
        </div>
    );
}

export default Countdown;