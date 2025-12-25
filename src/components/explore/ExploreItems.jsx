import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {

  const [explorItems, setExploritems] = useState([]);
  const [loading, setLoading] =useState(true);
  const [visibleCount, setVisiblecount] = useState(8);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    async function FeachExploritems(){
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
      setExploritems(data);
      setLoading(false);
      console.log(data)
      const initialountdowns = {};
      data.forEach((item) => {
        const timeLeft = item.expiryDate - Date.now();
        initialountdowns[item.id] = timeLeft > 0 ? timeLeft : 0 ;
      })
      setCountdowns(initialountdowns);
    }
     FeachExploritems()
  }, [])

  const handleLoadMore = () => {
    setVisiblecount((prev) => Math.min(prev + 4, explorItems.length))
  };

  useEffect(() => {
      if(!loading) {
        const timer = setInterval(() => {
          setCountdowns((prev) =>{
            const updated = {};
            explorItems.forEach((item) => {
              const current = prev[item.id] - 1000;
              updated[item.id] = current > 0 ? current : 0;
            });
            return updated;
          });
       }, 1000);
        return () => clearInterval(timer);
      }
    }, [loading, explorItems]);
  
    const formatTime = (ms) => {
      if (ms <= 0) return "00h 00m 00s";
      const totalSeconds = Math.floor(ms / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      return `${hours}h ${minutes}m ${seconds}s`;
    };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      { loading
          ? new Array(10).fill(0).map((_, index) => (
              <div  style={{ 
                 gap: "1rem" }} key={index}>
                <Skeleton circle height={60} width={60} style={{ margin: "auto", marginBottom: 10 }} />
                <i className="fa fa-check"></i>
                <Skeleton height={350} width={300} style={{ marginBottom: 10 }} />
              </div>
            ))
        : explorItems.slice(0, visibleCount).map(explorItem => (
          <div key={explorItem.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top">
                   <img className="lazy" src={explorItem.authorImage} alt="" />
                   <i className="fa fa-check"></i>
                </Link>
              </div>
              {countdowns[explorItem.id] > 0 && (
                <div className="de_countdown">
                  {formatTime(countdowns[explorItem.id])}
                </div>
              )}  
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                   <img src={explorItem.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{explorItem.title}</h4>
                </Link>
                <div className="nft__item_price">{explorItem.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{explorItem.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      {visibleCount < explorItems.length && (
        <div className="col-md-12 text-center" onClick={handleLoadMore} >
          <Link to="" id="loadmore" className="btn-main lead">
             Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
