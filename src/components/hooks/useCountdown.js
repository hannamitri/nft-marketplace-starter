import { useEffect, useState } from 'react';

const useCountdown = (expiryDate) => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const getTimeLeft = () => {
    const total = expiryDate - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      days: days > 9 ? days : `0${days}`,
      hours: hours > 9 ? hours : `0${hours}`,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      seconds: seconds > 9 ? seconds : `0${seconds}`,
    };
  };

  useEffect(() => {
    // Set initial time immediately
    if (expiryDate) {
      setCountdown(getTimeLeft());
    }

    // Update time every second
    const interval = setInterval(() => {
      if (expiryDate > Date.now()) {
        setCountdown(getTimeLeft());
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [expiryDate]);

  return countdown;
};

export default useCountdown;