import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [newData, setNewData] = useState([]);
  const loading = newData.length === 0;

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      setNewData(data);
    } catch (error) {
      console.error("Error fetching api:", error);
      setNewData([]);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  const options = {
    responsive: {
      0: {
        items: 1,
      },
      560: {
        items: 2,
      },
      770: {
        items: 3,
      },
      980: {
        items: 4,
      },
    },
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
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
          {loading && (
            <ReactOwlCarousel {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton circle={true} height={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown">
                      <Skeleton width={70} borderRadius={50} />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        containerClassName="nft__item_wrap"
                        width={"100%"}
                        height={"65%"}
                        borderRadius={15}
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={100} />
                      <Skeleton width={50} />
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <Skeleton width={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
          {!loading && (
            <ReactOwlCarousel {...options}>
              {newData.map((newData) => (
                <div key={newData.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${newData.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newData.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Timer initialTime={newData.expiryDate} />
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
                      <Link to={`/item-details/${newData.nftId}`}>
                        <img
                          src={newData.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newData.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newData.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newData.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
