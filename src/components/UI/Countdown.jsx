import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [countdown, setCountdown] = useState("00:00:00");

  // useEffect runs when the component mounts and when expiryDate changes
  useEffect(() => {
    // Function to update the countdown timer
    const updateCountdown = () => {
      // Check if an expiryDate is provided
      if (expiryDate) {
        // Calculate the remaining time in milliseconds
        const remainingTime = new Date(expiryDate) - Date.now();

        // If the remaining time is less than or equal to 0, set the countdown to "00:00:00"
        if (remainingTime <= 0) {
          setCountdown("00:00:00");
        } else {
          // Calculate hours, minutes, and seconds from the remaining time
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);

          // Format the time as HH:MM:SS
          const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`;

          // Set the countdown state with the formatted time
          setCountdown(formattedTime);
        }
      }
    };

    // Set up an interval to update the countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Initial call to updateCountdown
    updateCountdown();

    // Clean up the interval when the component unmounts or when expiryDate changes
    return () => clearInterval(interval);
  }, [expiryDate]);

  // Render the countdown timer
  return <span>{countdown}</span>;
};

export default Countdown;