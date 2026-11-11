import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton.jsx";

function Slider1() {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        if (response.data) {
          setHotCollections(response.data);
        } else {
          setHotCollections([]);
        }
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);  
      }
    };
    fetchHotCollections();
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className='slider-container' style={{ padding: "0 20px" }}>
      <Slider {...settings}>
        {loading
          ? new Array(4).fill(0).map((_, index) => (
              <div key={index}>
                <div
                  className='nft_coll'
                  style={{ margin: "0 10px", display: "block" }}
                >
                  <div className='nft_wrap'>
                    <Skeleton height='200px' width='100%' />
                  </div>
                  <div className='nft_coll_pp'>
                    <Skeleton width='50px' height='50px' borderRadius='50%' />
                  </div>
                  <div className='nft_coll_info' style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
                    <Skeleton width='60%' height='20px' />
                    <Skeleton width='40%' height='15px' />   
                  </div>
                </div>
              </div>
            ))
          : hotCollections.map((hotCollection) => (
              <div key={hotCollection.id}>
                <div
                  className='nft_coll'
                  style={{ margin: "0 10px", display: "block" }}
                >
                  <div className='nft_wrap'>
                    <Link to={`/item-details`}>
                      <img
                        src={hotCollection.nftImage}
                        className='lazy img-fluid'
                        alt={hotCollection.title}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                  </div>
                  <div className='nft_coll_pp'>
                    <Link to={`/author`}>
                      <img
                        className='lazy pp-coll'
                        src={hotCollection.authorImage}
                        alt='Author Profile'
                      />
                    </Link>
                    <i className='fa fa-check'></i>
                  </div>
                  <div className='nft_coll_info'>
                    <Link to='/explore'>
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    <span>ERC-{hotCollection.code}</span>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
}

export default Slider1;
