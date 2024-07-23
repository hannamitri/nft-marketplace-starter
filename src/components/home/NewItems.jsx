import React, { useEffect, useRef, useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,  
  Gamepad: 10,
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
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};



const NewItems = () => {
  const [loading, setLoading] = useState(false);
  const [nftApi, setNftApi] = useState([]);
  const [time, setTime] = useState(new Date());  
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };  


  async function fetchApi() {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    const response = data.data;
    setNftApi(response);
    setLoading(false);
  }

  
  useEffect(() => {
    fetchApi();    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
  return () => clearInterval(interval);
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider ref={slider => {
          sliderRef = slider;
        }} className="owl-theme" {...settings} >            
            {loading ? (
              new Array(4).fill(0).map((array, index) => (
                <div className="nft_coll new_container" key={index}>
                    <div className="nft__item new_item">
                      <div className="author_list_pp author_list_new">
                          <Skeleton width="50px" height="50px" borderRadius="50%"/>
                          <i className="fa fa-check"></i>
                      </div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <div className="nft__item_share">
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
                          <Skeleton width="100%" height="350px"/>
                      </div>
                      <div className="skele__item_info">
                          <Skeleton width="180px" height="30px" />
                          
                        <Skeleton width="100px" height="20px" />
                        <div className="skele__like">                          
                          <Skeleton width="30px" height="15px" />
                          </div>
                      </div>
                    </div>
                  </div>
                  
              ))
            ) : (
                nftApi.map((array, index) => (
                  <div className="slide__wrapper" key={index}>
                  <div className="nft__wrapper-new" >
                    <div className="nft__item new_item">
                      <div className="author_list_pp author_list_new">
                        <Link
                          to={`/author/${array.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy lazy-img"
                            src={array.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {(array.expiryDate - time) > 0 &&
                      <div className="de_countdown">                        
                      <span>{(Math.floor(((((array.expiryDate - time) / 1000))/60)/60))}</span><span>h </span>
                      <span>{(Math.floor(((((array.expiryDate - time) / 1000))/60)%60))}</span><span>m </span>
                      <span>{(Math.floor(((array.expiryDate - time) / 1000))%60)}</span><span>s</span>                      
                      </div>}
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

                        <Link to={`/item-details/${array.nftId}`}>
                          <img
                            src={array.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${array.nftId}`}>
                          <h4>Pinky Ocean</h4>
                        </Link>
                        <div className="nft__item_price">{array.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{array.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ))
            )}
          </Slider>                 
          <button className="prev arrows owl-nav owl-theme owl-lazy" onClick={previous}>{"<"}</button>    
          
          <button className="next arrows owl-nav owl-theme owl-lazy" onClick={next}>{">"}</button>
          </div>  
        </div>
    </section>
  );
};

export default NewItems;
