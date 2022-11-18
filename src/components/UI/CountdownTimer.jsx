import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function CountdownTimer() {
    const [newItems, setNewItems] = useState([]);
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');

    async function fetchNewItems() {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
      }
    
      useEffect(() => {
        fetchNewItems();
      }, []);

      const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    

  return (
    <div>CountdownTimer</div>
  )
}

export default CountdownTimer