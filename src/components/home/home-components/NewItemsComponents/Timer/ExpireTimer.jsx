import React from 'react';
import Countdown from 'react-countdown';

const Complete = () => <span>Expired</span>

const ExpireTimer = ({nft}) => {
    const expireDate = nft.expiryDate

    const renderer = ({hours, minutes, seconds, completed}) => {
        if(completed) {
            return <Complete />
        }
        else {
            return <span>{hours}h {minutes}m {seconds}s</span>
        }
    }

    return (
        <>
            {
                expireDate ? (
                    <Countdown 
                        date={expireDate}
                        precision={3}
                        renderer={renderer}
                    />
                ) : (
                    <span>Does not expire</span>
                )
            }
        </> 
     );
}
 
export default ExpireTimer;