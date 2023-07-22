import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function StyledNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

function StyledPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

const CarouselNewItems = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      async function fetchData () {
        await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
        .then(response => {
        setData(response.data)
        setLoading(false);
        })
        .catch(error => {
          console.error(`the error is ${error}`);
        });
      }
      fetchData();
    }, [])

    console.log(data);
    
    
    const slidesToShow = 4;
    const slideWidth = 100 / slidesToShow + "%";

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      nextArrow: <StyledNextArrow />,
      prevArrow: <StyledPrevArrow />,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };

    return (
      <div>
        <Slider {...settings}>
          {loading ? ( 
            new Array(4).fill(7).map((element, index) => (
              <div key={index}>
                <div className="nft_coll" style={{marginLeft: "10px"}}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${element.nftId}`}>
                      <div className="skeleton-box" style={{width: "100%", height: "100%"}}></div>
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <div className="skeleton-box" style={{width: "60px", height: "60px", borderRadius: "50%"}}></div>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4 className="skeleton-box" style={{color: "#dddbdd"}}>{element.title}</h4>
                    </Link>
                    <span className="skeleton-box" style={{color: "#dddbdd"}}>ERC-{element.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            data.map((element, index) => (
                // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div key={index}>
                  <div className="nft__item" style={{marginLeft: "10px"}}>
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={element.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">5h 30m 32s</div>
    
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
    
                      <Link to={`/item-details/${element.nftId}`}>
                        <img
                          src={element.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{element.title}</h4>
                      </Link>
                      <div className="nft__item_price">{element.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{element.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </Slider>
      </div>
    );
  };

export default CarouselNewItems