import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Skeleton from "../UI/Skeleton";
import OwlCarousel from 'react-owl-carousel';
import Countdown from "../UI/Countdown";

const NewItems = () => {

  const [newItems, setNewItems] = useState([]);

  async function fetchData() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setNewItems(data);
  }

  useEffect(() => {
    fetchData()
  }, [])

  const carouselSettings = {
    nav: true,
    margin: 10,
    loop: true,
    mouseDrag: false,
    responsiveRefreshRate: 10,
    responsive: {
      0: {items: 1},
      576: {items: 2},
      980: {items: 3},
      1200: {items: 4}
    }
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
          <OwlCarousel key={Date.now()} {...carouselSettings}>
            {
              newItems.length > 0 
              ?
              newItems.map((item) => (
                <div className="" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {
                      item.expiryDate !== null && <Countdown item={item}/>
                    }
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
    
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{`${item.price} ETH`}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <div>
                  <div className="nft__item">
                    <div className="author_list_pp">
                        <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"}/>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft__item_wrap">     
                      <Skeleton width={"100%"} height={"225px"} borderRadius={"8px"}/>
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={"100px"} height={"20px"}/>
                      <div className="nft__item_price">
                        <Skeleton width={"50px"} height={"20px"}/>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span><Skeleton width={"15px"} height={"15px"}/></span>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
