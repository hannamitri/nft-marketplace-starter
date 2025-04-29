import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "../SkeletonCard";
import axios from 'axios';
import Countdown from '../Countdown';

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    let apiUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';

    if (filter) {
      apiUrl += `?filter=${filter}`;
    }

    axios
      .get(apiUrl)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data', err);
        setLoading(false);
      });
  }, [filter]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most Liked</option>
        </select>
      </div>

      {loading 
      ? new Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
      : items.slice(0, visibleItems).map((item, index) => {
        console.log(item)
        return (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Countdown expiryDate={item.expiryDate} />

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a>
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
      )
    })
  }
  
        {visibleItems < items.length && (
      <div className="col-md-12 text-center">
          <button className='btn-main lead' onClick={loadMore}>
            Load more
          </button>
        </div>
     )}
  </>
  );
};

export default ExploreItems;
