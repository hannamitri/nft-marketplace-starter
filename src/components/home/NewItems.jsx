import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollIntervalRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, items.length - itemsPerView);

  const scrollToIndex = (index) => {
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    setCurrentIndex(index);
  };

  const startContinuousScroll = (direction) => {
    if (scrollIntervalRef.current) return;
    
    scrollIntervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (direction === 'left') {
          return prev <= 0 ? maxIndex : prev - 1;
        } else {
          return prev >= maxIndex ? 0 : prev + 1;
        }
      });
    }, 150);
  };

  const stopContinuousScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns = {};
      items.forEach((item) => {
        const endTimeValue = item.endTime || item.end_time || item.auctionEnd || item.auction_end || item.expiresAt || item.expires_at;
        
        if (endTimeValue) {
          const now = new Date().getTime();
          let endTime;
          
          if (typeof endTimeValue === 'string') {
            endTime = new Date(endTimeValue).getTime();
          } else if (typeof endTimeValue === 'number') {
            endTime = endTimeValue;
          } else {
            newCountdowns[item.id] = "Invalid time";
            return;
          }
          
          const timeLeft = endTime - now;

          if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            newCountdowns[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newCountdowns[item.id] = "Expired";
          }
        } else {
          const mockEndTime = new Date().getTime() + (Math.random() * 24 * 60 * 60 * 1000);
          const now = new Date().getTime();
          const timeLeft = mockEndTime - now;
          
          if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            newCountdowns[item.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newCountdowns[item.id] = "Expired";
          }
        }
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [items]);

  const SkeletonLoader = () => (
    <div className="row">
      {new Array(4).fill(0).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="de_countdown">
              <Skeleton width="80px" height="20px" borderRadius="4px" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="250px" borderRadius="8px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <Skeleton width="80px" height="16px" borderRadius="4px" />
              <Skeleton width="40px" height="16px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
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
            <div className="col-lg-12">
              <SkeletonLoader />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          <div className="col-lg-12" data-aos="fade-up">
            <div className="position-relative">
              <button
                className="carousel-arrow carousel-arrow-left"
                onClick={() => scrollToIndex(currentIndex - 1)}
                onMouseDown={() => startContinuousScroll('left')}
                onMouseUp={stopContinuousScroll}
                onMouseLeave={stopContinuousScroll}
                style={{
                  position: 'absolute',
                  left: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                <i className="fa fa-chevron-left"></i>
              </button>

              <button
                className="carousel-arrow carousel-arrow-right"
                onClick={() => scrollToIndex(currentIndex + 1)}
                onMouseDown={() => startContinuousScroll('right')}
                onMouseUp={stopContinuousScroll}
                onMouseLeave={stopContinuousScroll}
                style={{
                  position: 'absolute',
                  right: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                <i className="fa fa-chevron-right"></i>
              </button>

              <div className="row" ref={carouselRef}>
                {items
                  .slice(currentIndex, currentIndex + itemsPerView)
                  .map((item, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index} data-aos="fade-up">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId || item.author?.id || 'unknown'}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.author?.name || 'Unknown'}`}
                          >
                            <img 
                              className="lazy" 
                              src={item.author?.avatar || item.authorImage || "/images/author_thumbnail.jpg"} 
                              alt={item.author?.name || 'Author'} 
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">
                          {countdowns[item.id] || "Loading..."}
                        </div>

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

                          <Link to={`/item-details/${item.nftId || item.id}`}>
                            <img
                              src={item.image || item.nftImage || "/images/nftImage.jpg"}
                              className="lazy nft__item_preview"
                              alt={item.title || item.name || 'NFT'}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId || item.id}`}>
                            <h4>{item.title || item.name || 'Untitled'}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price || item.ethPrice || '0'} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes || item.likeCount || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
