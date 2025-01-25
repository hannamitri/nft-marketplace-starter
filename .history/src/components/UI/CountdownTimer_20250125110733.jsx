import React from 'react';

const CountdownTimer = () => {
    return (
        <div>
              {Date.now() < item.expiryDate && (
                        <div className="de_countdown">
                          {timeLeft.expired
                            ? timeLeft.expired
                            : `${timeLeft.hrs}h ${timeLeft.min}m ${timeLeft.sec}s`}
                        </div>
                      )}

        </div>
    );
}

export default CountdownTimer;
