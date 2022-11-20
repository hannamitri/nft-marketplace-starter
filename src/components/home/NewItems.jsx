import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LoadingPlaceHolder from './LoadingPlaceHolder'
import Timer from "../UI/Timer";

const NewItems = () => {

  const [loaded, setLoaded] = useState();
  const [items, setItems] = useState([]);
  async function getData() {
    setLoaded(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoaded(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      577: {
        items: 2,
      },
      770: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

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
          
          {loaded ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
            >
              {items.map((item, index) => (
                <div className="item" key={index}>
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
                    
                    {item.expiryDate && (
                        <div className="de_countdown">
                          {<Timer expiryDate={item.expiryDate} />}
                        </div>
                      )} 

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
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
                 ))}
                 </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
            >
              {new Array(7).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                    <LoadingPlaceHolder extraStyles={{height:'100%'}}/>
                    </div>

                    <div className="nft__item_info">
                    <LoadingPlaceHolder extraStyles={{height:'100%'}}/>
                      <Link to="/item-details">
                      <LoadingPlaceHolder extraStyles={{height:'15px', width:'130px', marginBottom: '16px', marginTop: '20px', borderRadius: '10px'}}/>
                      </Link>
                      <div className="nft__item_price">
                      <LoadingPlaceHolder extraStyles={{height:'15px', width:'100px', marginBottom: '16px', marginTop: '20px', borderRadius: '10px'}}/>
                      </div>
                      <div className="nft__item_like">
                      <LoadingPlaceHolder extraStyles={{height:'15px', width:'40px', marginBottom: '16px', marginTop: '20px', borderRadius: '10px'}}/>
                      </div>
                    </div>
                  </div>
                </div>
          
          ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
