import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { type } from "@testing-library/user-event/dist/type";
import { Link } from "react-router-dom";
import axios from "axios";



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function CustomArrows() {
  const settings = {
    dots: false,
    infinite: true,
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
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    
    useEffect(() => {
        fetchApi();
    }, []);
    
    const [api, setApi] = useState([]);
  async function fetchApi() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setApi(data);
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {api.map((api, index) => (
          <div className="px-2 " key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to= {`/item-details/${api.nftId}`}>
                  <img src={api.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to={`/author/${api.authorId}`}>
                  <img className="lazy pp-coll" src={api.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to={`/item-details/${api.nftId}`}>
                  <h4>{api.title}</h4>
                </Link>
                <span>ERC-{api.code}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomArrows;
