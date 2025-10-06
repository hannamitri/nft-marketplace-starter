import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import './HotCollectionsCarousel.css';

const HotCollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState({});

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(res.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid">
      <div className="keen-slider">
        {[1, 2, 3, 4].map((_, index) => (
          <div className="keen-slider__slide item" key={index}>
            <Skeleton
              width="100%"
              height="250px"
              borderRadius="8px"
              style={{ margin: "0 8px" }}
            />
            <Skeleton
              width="50px"
              height="50px"
              borderRadius="50%"
              style={{ marginTop: "10px" }}
            />
            <Skeleton
              width="80%"
              height="20px"
              borderRadius="4px"
              style={{ marginTop: "10px" }}
            />
          </div>
        ))}
      </div>
    </div>
    );
  }

  return (
    <div id="HotCollectionsCarousel">
      <div className="container-fluid">
        <div ref={sliderRef} className="keen-slider">
          {collections.map((item, index) => (
            <div className="keen-slider__slide item" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy img-fluid"
                      alt=""
                      onLoad={() =>
                        setImgLoaded((prev) => ({
                          ...prev,
                          [item.id]: true,
                        }))
                      }
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/item-details/${item.id}`}>
                    <img
                      className="lazy pp-coll"
                      src={item.authorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to={`/item-details/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC{item.code}</span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => instanceRef.current?.prev()} className="slider-button left">
            <img className="arrow left__arrow" src="https://static.vecteezy.com/system/resources/previews/017/784/917/non_2x/left-arrow-icon-on-transparent-background-free-png.png" alt="" />
          </button>
          <button onClick={() => instanceRef.current?.next()} className="slider-button right">
             <img className="arrow right__arrow" src="https://static.vecteezy.com/system/resources/thumbnails/017/785/208/small_2x/right-arrow-icon-on-transparent-background-free-png.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotCollectionsCarousel;
