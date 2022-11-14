import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "./Countdown";

const NewItems = () => {
  const [collections, getCollections] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const state = {
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

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    getCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
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

          {!loading ? (
            <>
              <OwlCarousel
                items={4}
                loop={true}
                nav={true}
                margin={12}
                responsive={state.responsive}
                smartSpeed={500}
              >
                {new Array(5).fill(0).map((_, index) => (
                  <div
                    className="item"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={48} height={52} borderRadius={999} />
                      </div>

                      <div className="nft__item_wrap">
                      <Skeleton width={240} height={240} borderRadius={12} />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width={120} height={36} borderRadius={8} />
                        <div className="nft__item_price">
                          <Skeleton width={100} height={24} borderRadius={8} />
                        </div>
                        <div className="nft__item_like">
                          <span>
                            <Skeleton
                              width={36}
                              height={26}
                              borderRadius={8}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <>
              <OwlCarousel
              >
                {collections.map((collect) => (
                  <div
                    className="item"
                    key={collect.id}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${collect.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={collect.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div> 
                      
                      {collect.expiryDate && (
                        <Countdown expiryDate={collect.expiryDate} />
                      )}



                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="/" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="/" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="/">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div> 
                        </div>
                        <Link to={`/item-details/${collect.nftId}`}>
                          <img
                            src={collect.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{collect.title}</h4>
                        </Link>
                        <div className="nft__item_price"> {collect.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{collect.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
