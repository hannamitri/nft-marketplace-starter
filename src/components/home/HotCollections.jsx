import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with delay
    setTimeout(() => {
      const apiData = [
        {
          id: 1,
          title: "Abstraction",
          authorImage: "https://nft-place.web.app/static/media/author-1.04ee784f53cbe427d362.jpg",
          nftImage: "https://nft-place.web.app/static/media/coll-1.b8f9d867e8ed59ee7fa7.jpg",
          code: 192
        },
        {
          id: 2,
          title: "Patternlicious",
          authorImage: "https://i.pravatar.cc/150?img=2",
          nftImage: "https://nft-place.web.app/static/media/coll-2.f50ac8b33595d70f28f6.jpg",
          code: 661
        },
        {
          id: 3,
          title: "Skecthify",
          authorImage: "https://i.pravatar.cc/150?img=3",
          nftImage: "https://nft-place.web.app/static/media/coll-3.5cf44b8fe602daac453e.jpg",
          code: 164
        },
        {
          id: 4,
          title: "Cartoonism",
          authorImage: "https://i.pravatar.cc/150?img=4",
          nftImage: "https://nft-place.web.app/static/media/coll-4.ce394fcfef6b2f9a21fe.jpg",
          code: 112
        },
        {
          id: 5,
          title: "Virtuland",
          authorImage: "https://i.pravatar.cc/150?img=5",
          nftImage: "https://nft-place.web.app/static/media/coll-5.8cda59d9f6c8d1570e02.jpg",
          code: 68
        },
        {
          id: 6,
          title: "Papercut",
          authorImage: "https://i.pravatar.cc/150?img=6",
          nftImage: "https://nft-place.web.app/static/media/coll-6.05fd27315e8e537c9193.jpg",
          code: 316
        }
      ];

      setCollections(apiData);
      setLoading(false);
    }, 2000); // 2 second delay to see skeleton
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Skeleton component
  const SkeletonCard = () => (
    <div className="nft_coll" style={{margin: '0 10px'}}>
      <div className="skeleton skeleton-image" style={{
        width: '100%',
        height: '200px',
        borderRadius: '10px',
        marginBottom: '15px'
      }}></div>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
        <div className="skeleton skeleton-circle" style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          marginRight: '10px'
        }}></div>
        <div style={{flex: 1}}>
          <div className="skeleton skeleton-text" style={{
            width: '60%',
            height: '20px',
            borderRadius: '4px',
            marginBottom: '8px'
          }}></div>
          <div className="skeleton skeleton-text" style={{
            width: '40%',
            height: '15px',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>
    </div>
  );

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
            <style>{`
              .slick-prev, .slick-next {
                background: #8364e2 !important;
                border-radius: 50%;
                width: 40px !important;
                height: 40px !important;
                z-index: 1;
              }
              .slick-prev:hover, .slick-next:hover {
                background: #6c4fd6 !important;
              }
              .slick-prev:before, .slick-next:before {
                font-size: 30px;
                color: white !important;
              }
              .slick-prev {
                left: -50px !important;
              }
              .slick-next {
                right: -50px !important;
              }

              /* Skeleton Loading Styles */
              .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }

              @keyframes loading {
                0% {
                  background-position: 200% 0;
                }
                100% {
                  background-position: -200% 0;
                }
              }
            `}</style>

            {loading ? (
              <div style={{display: 'flex', gap: '20px'}}>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <Slider {...settings}>
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll" style={{margin: '0 10px'}}>
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={collection.authorImage} alt={collection.title} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
