import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [newItems, setNew] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setLoading(false);
    console.log(data);
    setNew(data);
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

          {!loading && newItems.length > 0 ? (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              dots={false}
              responsive={{
                1200: { items: 4 },
                992: { items: 3 },
                768: { items: 2 },
                0: { items: 1 },
              }}
            >
              {newItems.map((newItems) => (
                <div key={newItems.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newItems.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown info={newItems} />

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
                          src={newItems.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newItems.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {newItems.price} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItems.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="100%" borderRadius={5} />
                  </div>
                  <Skeleton width="80%" height={10} borderRadius={5} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
