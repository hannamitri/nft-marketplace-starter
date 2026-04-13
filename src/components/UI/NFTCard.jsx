import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NFTCard({ item }) {
    const [time, setTime] = useState("");

    const formatTime = () => {
        if (!item.expiryDate) return "Ended"
        
         const diff = item.expiryDate - Date.now();

         if (diff <= 0)  return "Ended";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60)) % 60);
        const seconds = Math.floor((diff % (1000 * 60)) % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(formatTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [item.expiryDate]);
   

  return (
   
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">

        <div className="author_list_pp">
          <Link to="/author">
            <img src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        <div className="de_countdown">{time}</div>

        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.id}`}>
            <img
              src={item.nftImage}
              className="nft__item_preview"
              alt=""
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={`/item-details/${item.id}`}>
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NFTCard;