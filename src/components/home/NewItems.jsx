import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Countdown from "./Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }


  const options = {
    margin: 12,
    responsiveClass: true,
    nav: true,
    mergeFit: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    getItems();
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
          {!loading && (
            <OwlCarousel className="owl-theme" {...options}>
              {items.map((item, index) => (
                <div key={index}>
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
                      <Countdown expiry={item.expiryDate}/>

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
          )}{" "}
          {loading && (
            <OwlCarousel className="owl-theme" {...options}>
              {new Array(6).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div
                        className="skeleton-box"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50px",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap ">
                      <div className="nft__item_extra"></div>
                      <div
                        className="skeleton-box"
                        alt=""
                        style={{
                          width: "100%",
                          height: "350px",
                          marginBottom: "12px",
                        }}
                      ></div>
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "180px", height: "30px" }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100px",
                          height: "20px",
                          display: "block",
                        }}
                      ></div>
                      <div className="nft__item_like">
                        <div
                          className="skeleton-box"
                          style={{ width: "30px", height: "15px" }}
                        ></div>
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
