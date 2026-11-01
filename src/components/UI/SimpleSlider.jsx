import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const hotCollectionsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

// Custom Previous Arrow Component
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

// Custom Next Arrow Component
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const SimpleSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 762,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [hotCollections, setHotCollections] = useState([]);

  async function getHotCollections() {
    const { data } = await axios.get(hotCollectionsUrl);
    setHotCollections(data);
  }

  useEffect(() => {
    getHotCollections();
  }, []);

  return (
    <div style={{ position: "relative", padding: "0 20px" }}>
      <Slider {...settings}>
        {hotCollections.map((collection, index) => (
          <div key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to="/item-details">
                  <img
                    src={collection.nftImage}
                    className="lazy img-fluid"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to="/author">
                  <img
                    className="lazy pp-coll"
                    src={collection.authorImage}
                    alt=""
                  />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{collection.name}</h4>
                </Link>
                <span>ERC-{collection.code}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
