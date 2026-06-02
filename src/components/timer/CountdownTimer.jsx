import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CountdownTimer = () => {
  const [exploreItems, setExploreItems] = useState([]);

  const getDataFromApi = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`,
      );
      setExploreItems(data);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  useEffect (() => {
    getDataFromApi();
  },[getDataFromApi]);

  function getTimeLeft(expiryDate) {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }

  function CountdownTimer({ expiryDate }, item) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryDate));

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft(expiryDate));
      }, 1000);
      return () => clearInterval(interval);
    }, [expiryDate]);

    const { hours, minutes, seconds } = timeLeft;
    return (
      <div className="de_countdown">
        {String(hours).padStart(2, "0")}h &nbsp;
        {String(minutes).padStart(2, "0")}m &nbsp;
        {String(seconds).padStart(2, "0")}s
      </div>
    );
  }

  return (
    <div>
      <div className="de_countdown">
      {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}
      </div>
    </div>
  );
};

export default CountdownTimer;
