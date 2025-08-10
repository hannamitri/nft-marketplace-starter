import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../UI/CountdownTimer';
import Slider from 'react-slick';

const NewItems = () => {
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
      if (!response.ok) {
        throw new Error('Failed to fetch new items');
      }
      const data = await response.json();
      setNftItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  // Slick Carousel Settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <button className="slick-prev" type="button"><i className="fa fa-angle-left"></i></button>,
    nextArrow: <button className="slick-next" type="button"><i className="fa fa-angle-right"></i></button>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (error) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
                <p>Error loading new items: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            <Slider {...carouselSettings}>
              {loading ? (
                // Show skeleton loading for 4 items
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`skeleton-${index}`}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="de_countdown">
                        <div className="skeleton-box" style={{ width: '80px', height: '20px' }}></div>
                      </div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <div className="skeleton-box" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
                              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
                              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="skeleton-box" style={{ width: '100%', height: '300px', borderRadius: '8px' }}></div>
                      </div>
                      <div className="nft__item_info">
                        <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
                        <div className="skeleton-box" style={{ width: '60px', height: '16px' }}></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Show actual NFT items in carousel structure
                nftItems.map((item) => (
                  <div key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId || 'unknown'}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName || ''}`}
                        >
                          <img
                            className="lazy"
                            src={item.authorImage || 'https://via.placeholder.com/50x50/6366f1/ffffff?text=Author'}
                            alt={item.authorName || 'Author'}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50/6366f1/ffffff?text=Author';
                            }}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {/* Countdown Timer - only show if expiryDate exists */}
                      {item.expiryDate && (
                        <CountdownTimer expiryDate={item.expiryDate} />
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
                        <Link 
                          to={`/item-details/${item.nftId}`}
                        >
                          <img
                            src={item.nftImage || item.image}
                            className="lazy nft__item_preview"
                            alt={item.title || 'NFT'}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=NFT';
                            }}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link 
                          to={`/item-details/${item.nftId}`}
                        >
                          <h4>{item.title || ''}</h4>
                        </Link>
                        <div className="nft__item_price">
                          <span>{item.price || 0} ETH</span>
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
