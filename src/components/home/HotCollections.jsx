import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollIntervalRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const [response] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
        
        setCollections(response.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setError(error.message || "Failed to load collections");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCollections();
  }, []);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, collections.length - itemsPerView);

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

  const SkeletonLoader = () => (
    <div className="row">
      {new Array(4).fill(0).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Skeleton 
                width="100%" 
                height="200px" 
                borderRadius="8px" 
              />
            </div>
            <div className="nft_coll_pp">
              <Skeleton 
                width="50px" 
                height="50px" 
                borderRadius="50%" 
              />
            </div>
            <div className="nft_coll_info">
              <Skeleton 
                width="120px" 
                height="20px" 
                borderRadius="4px" 
              />
              <div style={{ marginTop: "8px" }}>
                <Skeleton 
                  width="80px" 
                  height="16px" 
                  borderRadius="4px" 
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
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
              <SkeletonLoader />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
              <div className="text-center" style={{ padding: "40px 0" }}>
                <div style={{ 
                  background: "#f8f9fa", 
                  padding: "20px", 
                  borderRadius: "8px",
                  border: "1px solid #e9ecef"
                }}>
                  <i className="fa fa-wifi" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                  <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Connection Issue</h4>
                  <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    style={{
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                {collections
                  .slice(currentIndex, currentIndex + itemsPerView)
                  .map((collection, index) => {
                    const generateDisplayNumber = (nftId) => {
                      const num = parseInt(nftId) || 0;
                      return (num % 1000) + 100;
                    };

                    const displayNumber = generateDisplayNumber(collection.nftId || collection.id || index);
                    const title = collection.title || collection.name || "Collection Name";
                    const displayTitle = `${title} #${displayNumber}`;

                    return (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id || collection.nftId || index} data-aos="fade-up">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${collection.nftId || collection.id || index}`}>
                              <img 
                                src={collection.image || collection.nftImage || collection.img || nftImage} 
                                className="lazy img-fluid" 
                                alt={title} 
                                onError={(e) => {
                                  e.target.src = nftImage;
                                }}
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${collection.authorId || collection.author?.id || 'default'}`}>
                              <img 
                                className="lazy pp-coll" 
                                src={collection.authorImage || collection.author?.image || collection.author?.img || AuthorImage} 
                                alt={collection.authorName || collection.author?.name || "Author"} 
                                onError={(e) => {
                                  e.target.src = AuthorImage;
                                }}
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{displayTitle}</h4>
                            </Link>
                            <span>{collection.erc || collection.ercType || "ERC-192"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
