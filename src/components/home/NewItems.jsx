import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

function useCountdown(expiryDate) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const tick = () => {
      const diff = expiryDate - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  return timeLeft;
}

function NewItemCard({ item }) {
  const countdown = useCountdown(item.expiryDate);

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${item.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator"
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {item.expiryDate && (
          <div className="de_countdown">{countdown}</div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="mailto:">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId}`}>
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewItemSkeleton() {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="200px" borderRadius="8px" />
        </div>
        <div className="nft__item_info">
          <Skeleton width="80%" height="20px" borderRadius="4px" />
          <Skeleton width="40%" height="16px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading
            ? new Array(4).fill(0).map((_, i) => <NewItemSkeleton key={i} />)
            : items.map((item) => <NewItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
