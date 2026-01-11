import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        console.log(response.data);
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hot collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
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

  return (
    <section id="section-collections" className="no-bottom section-collections">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <div className="skeleton skeleton-image"></div>
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton skeleton-avatar"></div>
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              <div style={{ position: 'relative' }}>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {collections.map((collection, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title || "Pinky Ocean"}</h4>
                          </Link>
                          <span>{collection.code || "ERC-192"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <button
                  onClick={() => sliderRef.current.slickPrev()}
                  style={{
                    position: 'absolute',
                    left: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#fff',
                    border: '2px solid #333',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 10,
                    color: '#333'
                  }}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  onClick={() => sliderRef.current.slickNext()}
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#fff',
                    border: '2px solid #333',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 10,
                    color: '#333'
                  }}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
