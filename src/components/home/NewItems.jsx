
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
import Timer from "./Countdown";
import Skeleton from "../UI/Skeleton";

 
const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData(){
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
      setItems(data);
      setLoading(false);
    }
   fetchData();
  }, []);

  
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    if (loading) {
      return (
        <section id="section-collections" className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2>New Items</h2>
                  <div className="small-border bg-color-2"></div>
                </div>
              </div>
              <div className="slider-container">
                <Slider {...settings}>
                  {Array(5).fill(null).map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="10px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="80%" height="20px" />
                          <Skeleton width="40%" height="15px" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>                       
        </section>
      );
    }
  
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
          <div className="slider-container">

          <Slider {...settings}>
     { items.map((item) =>(
              <div >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown"><Timer duration ={item.expiryDate}/></div>
  
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
  
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
             

            ))
          }
           </Slider>
           </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;

