import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "./Countdown"; // Adjust the import based on your file structure
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setData(data);
      setLoading(false);
    }
    getData();
    console.log(data);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-left" data-aos-duration="1000">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container mr-10">
            <div className="row">
              {loading && (
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  nav
                  dots
                  items={4}
                  responsive={{
                    0: { items: 1 }, // 1 item for very small screens
                    600: { items: 2 }, // 2 items for small screens
                    900: { items: 3 }, // 3 items for medium screens
                    1200: { items: 4 },
                  }}
                >
                  {new Array(4).fill(0).map((_, index) => (
                    <div className="item" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={100} />
                        </div>
                        <div className="de_countdown">
                          <Skeleton width={100} height={20} borderRadius={5} />
                        </div>
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                          </div>
                          <Skeleton width={"100%"} height={200} borderRadius={10} />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width={"60%"} height={20} borderRadius={5} style={{ marginBottom: '10px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
              {!loading && (
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  nav
                dots
                items={4}
                responsive={{
                  0: { items: 1 }, // 1 item for very small screens
                  600: { items: 2 }, // 2 items for small screens
                  900: { items: 3 }, // 3 items for medium screens
                  1200: { items: 4 },
                }}
              >
                {data.map((elem, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${elem.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${elem.Creator}`}
                        >
                          <img className="lazy" src={elem.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">
                        <Countdown expiryDate={elem.expiryDate} />
                      </div>
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
                        <Link to={`/item-details/${elem.nftId}`}>
                          <img
                            src={elem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${elem.nftId}`}>
                          <h4>{elem.title}</h4>
                        </Link>
                        <div className="nft__item_price">{elem.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{elem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>)}
            </div>
          </div>
        </div>
        <div className="spacer-single"></div>
      </div>
    </section>
  );
};

export default NewItems;
