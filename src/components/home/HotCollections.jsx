import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const HotCollections = () => {
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
      if (!response.ok) {
        throw new Error('Failed to fetch hot collections');
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
    fetchHotCollections();
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
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
                <p>Error loading hot collections: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...carouselSettings}>
              {loading ? (
                // Show skeleton loading for 4 items
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`skeleton-${index}`}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="skeleton-box" style={{ width: '100%', height: '300px', borderRadius: '8px' }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
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
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link 
                          to={`/item-details/${item.nftId}`}
                        >
                          <img 
                            src={item.nftImage || item.image} 
                            className="lazy img-fluid" 
                            alt={item.title || 'NFT Collection'}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=NFT';
                            }}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId || 'unknown'}`}>
                          <img 
                            className="lazy pp-coll" 
                            src={item.authorImage || 'https://via.placeholder.com/50x50/6366f1/ffffff?text=Author'} 
                            alt={item.authorName || 'Author'}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50/6366f1/ffffff?text=Author';
                            }}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="nft_coll_info">
                        <Link 
                          to={`/item-details/${item.nftId}`}
                        >
                          <h4>{item.title || ''}</h4>
                        </Link>
                        <span>{item.price || 0} ETH</span>
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

export default HotCollections;
