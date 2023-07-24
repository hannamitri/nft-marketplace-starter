import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CountDown from "./CountDown";


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
        });
      }
      fetchData();
    }, [])

    
    
    const slidesToShow = 4;

    const settings = {
        nextArrow: <StyledNextArrow />,
        prevArrow: <StyledPrevArrow />,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
      
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
            new Array(7).fill(0).map((element, index) => (
            <div key={index}>
                <div className="nft__item" style={{marginLeft: "10px"}}>
                <div className="author_list_pp">
                    <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <div className="skeleton-box" style={{height: "60px", width: "60px", borderRadius : "50%"}}></div>
                        <i className="fa fa-check"></i>
                    </Link>
                </div>

                <div className="nft__item_wrap" >
                    <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                        <button className="skeleton-box" style={{color:"#dddbdd"}} >Buy Now</button>
                        <div className="nft__item_share">
                            <h4 className="skeleton-box" style={{color:"#dddbdd"}}>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                                <div className="skeleton-box" style={{width:"100%", height: "100%"}}></div>
                            </a>
                            <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                            </a>
                        </div>
                    </div>
                    </div>
                      <Link to={`/item-details/${element.nftId}`} className="skeleton-box" style={{width: "100%", height: "100%"}}></Link>
                    </div>
                    <div className="nft_coll_info" style={{display: "flex", flexDirection: "column"}}>
                        <Link to="/explore">
                            <div className="skeleton-box" style={{width: "180px", height: "30px", marginTop : "4px"}}></div>
                        </Link>
                        <div className="skeleton-box" style={{width: "100px", height: "30px"}}></div>
                    </div>
                    <div className="nft__item_like">
                        <div className="skeleton-box" style={{width: "32px", height: "16px"}}>{element.likes}</div>
                    </div>
                </div>
              </div>
            ))
          ) : (
            data.map((element, index) => (
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
                    {element.expiryDate != null && (
                        <div className="de_countdown">
                            <CountDown fullTime={element.expiryDate / 1000} />
                        </div>
                    )}
    
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