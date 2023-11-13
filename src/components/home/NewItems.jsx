import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Countdown from "react-countdown";

const NewItems = () => {
  const [items, setitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const calMilisecond = (time) => {
    return time - Date.now();
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      )
      .then((res) => {
        setTimeout(() => {
          setitems(res.data);
          setLoading(false);
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
      });
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
          {loading
            ? new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        height={"50px"}
                        width={"50px"}
                        borderRadius={"50%"}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        display: "inline-block",
                        right: "20px",
                      }}
                    >
                      <Skeleton
                        height={"32px"}
                        width={"110px"}
                        borderRadius={"30px"}
                        border={"none"}
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <Skeleton
                          height={"219px"}
                          width={"219px"}
                          borderRadius={"8px"}
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>
                          <Skeleton height={"1rem"} width={"5rem"} />
                        </h4>
                      </Link>
                      <div
                        style={{
                          display: "block",
                        }}
                      >
                        <Skeleton height={"1rem"} width={"3rem"} />
                      </div>
                      <div className="nft__item_like">
                        <span>
                          <Skeleton height={".75rem"} width={"1rem"} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.title}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      {calMilisecond(item.expiryDate) > 0 ? (
                        <>
                          <Countdown date={item.expiryDate} />
                        </>
                      ) : null}
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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
