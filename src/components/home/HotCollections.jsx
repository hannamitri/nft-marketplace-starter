import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Arrow from "../UI/Arrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const HotCollections = () => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);

  async function getCollections() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(true);

    }
  }

  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    console.log(collections);
  }, [collections]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, filter: 'invert()', transform: "scale(1.4)" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style, filter: 'invert()', transform: "scale(1.4)"
        }
        }
        onClick={onClick}
      />
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

          {loading ? (<Slider {...settings}>
            {new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-12 col-md-12 col-sm-10 col-xs-12"
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <div
                        className="skeleton-box"
                        style={{ width: '100%', height: '200px' }}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link to="/explore">
                      <div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div>

                    </Link>
                    <span>                      <div className="skeleton-box" style={{ width: '60px', height: '20px' }}></div>
                    </span>
                  </div>
                </div>
              </div>

            ))}
          </Slider>) : (<Slider {...settings}>
            {Object.values(collections).map((item) => (
              <div
                className="col-lg-12 col-md-12 col-sm-10 col-xs-12"
                key={item.id}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid h-full"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>)}


        </div>
      </div >
    </section >
  );
};


export default HotCollections;
