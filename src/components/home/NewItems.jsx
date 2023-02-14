import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] =useState([]);
  
    async function getItems() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
    }
    useEffect(() => {
      getItems();
    }, []); 

    const options = {
      nav: true,
      loop: true,
      items: 1,
      margin: 10,
      dots: false,
      stagePadding: 10,
      responsiveRefreshRate: 50,
      responsive: {
        1200: { items: 4 },
        768: { items: 2 },
        470: { items: 2 },
        0: { items: 1 },
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
          {items.length&&( 
          <OwlCarousel className="owl-theme" {...options}>
          {items.length > 0?
          items.map((item) => (
            <div className="items__wrap" key={item.authorId}>
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
                  {
                  item.expiryDate != null && <Countdown item={item}/>
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
          )):
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
                      <Skeleton width={"100px"} height={"20px"} borderRadius={"8px"}/>
                      <div className="nft__item_price">
                        <Skeleton width={"50px"} height={"20px"} borderRadius={"8px"}/>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span><Skeleton width={"15px"} height={"15px"} borderRadius={"4px"}/></span>
                      </div>
                    </div>
                  </div>
                </div>
          }
          </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
