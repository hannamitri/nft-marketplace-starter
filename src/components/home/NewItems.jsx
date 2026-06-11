import React, { useEffect, useState } from "react";
import axios from "axios";
import  { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const[items, setItems] = useState([]);

  async function getNewItems () {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setTimeout (() => {
    setItems(data);
  }, 2000);
}

  useEffect(() => {
    getNewItems();
  
  }, []);
  
function timeRemaining(expiryDate) {
  const total = expiryDate - Date.now();

  if (total <= 0) {
    return "0h 0m 0s";
  }

  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
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
{items.length === 0 ? (
  <div className="row">
    {new Array(4).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <Skeleton width="100%" height="350px" border-radius="12px" />
        </div>
    ))}
    </div>
  ) : (

  <OwlCarousel
    className="owl-carousel owl-theme"
    loop
    margin={20}
    nav
    dots={false}
    responsive={{
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    }}
  >
          {items.map((item) => (
            <div className="item" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {timeRemaining(item.expiryDate) !== "0h 0m 0s" && (
                <div className="de_countdown">
                  {timeRemaining(item.expiryDate)}
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
)}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
