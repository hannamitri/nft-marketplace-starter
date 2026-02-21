import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Countdowntimer.css';

const calculateTimeLeft = (expiryDate) => {
    const difference = expiryDate - Date.now();

    if (difference > 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
    }

     return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };

};

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft.expired) {
    return <div className="countdown-timer expired">Expired</div>;
  }

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="countdown-timer">
      <span className="time-value">{formatNumber(timeLeft.hours)}h</span>
      <span className="time-separator"> </span>
      <span className="time-value">{formatNumber(timeLeft.minutes)}m</span>
      <span className="time-separator"> </span>
      <span className="time-value">{formatNumber(timeLeft.seconds)}s</span>
    </div>
  );
};

CountdownTimer.propTypes = {
  expiryDate: PropTypes.number.isRequired,
};

export default CountdownTimer;