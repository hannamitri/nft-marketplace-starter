import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ExpiryDate from "../ExpiryDate";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getNewItems();
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
          <Splide
            options={{
              perPage: 4,
              breakpoints: {
                1400: {
                  perPage: 3,
                },
                995: {
                  perPage: 2,
                },
                770: {
                  perPage: 1,
                },
              },
              type: "loop",
              perMove: 1,
              pagination: false,
              focus: 0,
            }}
          >
            {newItems.map(
              (
                {
                  id,
                  authorId,
                  authorImage,
                  nftImage,
                  nftId,
                  title,
                  price,
                  likes,
                  expiryDate,
                },
                index
              ) => (
                <SplideSlide>
                  {loading ? (
                    <Skeleton
                      width="18.5rem"
                      height="350px"
                      borderRadius="20px"
                    />
                  ) : (
                    <div
                      data-aos="fade-right"
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft__item" style={{ width: "18.5rem" }}>
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img className="lazy" src={authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {expiryDate && <ExpiryDate expiryDate={expiryDate} />}

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
                              src={nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{title}</h4>
                          </Link>
                          <div className="nft__item_price">{price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SplideSlide>
              )
            )}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
