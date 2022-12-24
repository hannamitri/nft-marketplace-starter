import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Count from "./Count";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    axios({
      url: "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems ",
      method: "GET",
      dataResponse: "json",
    }).then((response) => {
      setData(response.data);
      setLoading(true);
    });
  }, []);
  const media = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
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
          {loading ? (
            <ReactOwlCarousel
              responsive={media.responsive}
              nav={true}
              margin={10}
              loop
            >
              {data.map((obj, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${obj.authorId}`}
                        obj-bs-toggle="tooltip"
                        obj-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={obj.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {obj.expiryDate && (
                      <div className="de_countdown">
                        <Count time={obj.expiryDate} />
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

                      <Link to={`/item-details/${obj.nftId}`}>
                        <img
                          src={obj.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${obj.nftId}`}>
                        <h4>{obj.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {obj.price.toFixed(2)} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{obj.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          ) : (
            <>
              <ReactOwlCarousel
                responsive={media.responsive}
                margin={10}
                loop
                nav={true}
              >
                {new Array(1).fill(0).map((obj, index) => (
                  <div className="" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={60} height={60} borderRadius={50} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="de_countdown">
                        <Skeleton width={85} height={11} borderRadius={7} />
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={480} height={256} borderRadius={8} />
                      </div>
                      <div className="nft__item_info">
                        <h4>
                          <Skeleton width={145} />
                        </h4>

                        <div className="nft__item_price">
                          <Skeleton width={78} />
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>
                            <Skeleton width={27} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
