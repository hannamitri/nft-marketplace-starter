import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";

const NewItems = () => {
  const [collection, setCollection] = useState([]);

  async function fetchCollection() {
    try {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setCollection(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchCollection();
    }, 2000);
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

          <OwlCarousel
            key={collection.length}
            loop
            margin={10}
            nav
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
              1400: {
                items: 4,
              },
            }}
          >
            {collection.length !== 0
              ? collection.map((item, index) => (
                  <div
                    key={index}
                  >
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

                      <Countdown endTime={item.expiryDate} />

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
              : Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div>
                          <Skeleton width="50px" height="50px" borderRadius="100%"/>
                          <i className="fa fa-check"></i>
                        </div>
                      </div>

                      <div className="nft__item_wrap">

                        <div>
                          <Skeleton
                          width="285px"
                          height="350px"
                          />
                        </div>
                      </div>
                      <div className="nft__item_info">
                        <div>
                          <Skeleton height='20px' width='60%'/>
                        </div>
                        <div className="nft__item_price">
                          <Skeleton height='15px' width='25%'/>
                        </div>
                        <div className="nft__item_like">
                          <Skeleton height='15px' width='30px'/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
