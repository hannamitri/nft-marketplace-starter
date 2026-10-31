import { useEffect, useState } from "react";

const useCountdown = (items) => {
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    function updateCountdowns() {
      const updatedCountdowns = {};

      items.forEach((item) => {
        if (item.expiryDate == null) return;

        const timeRemaining = Math.max(0, item.expiryDate - Date.now());

        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        updatedCountdowns[item.id] = `${hours}h ${minutes}m ${seconds}s`;
      });

      setCountdowns(updatedCountdowns);
    }

    updateCountdowns();

    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [items]);

  return countdowns;
};

export default useCountdown;
