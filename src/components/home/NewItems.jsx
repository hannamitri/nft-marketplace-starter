import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [loading, setLoading] = useState(undefined);
  const [items, setItems] = useState([]);

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

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
              >
                {new Array(5).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <Skeleton width={0} height={50} borderRadius={0} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={275} height={350} borderRadius={0} />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton width={0} height={35} borderRadius={0} />
                        <Link to="/item-details">
                          <Skeleton width={160} height={30} borderRadius={0} />
                        </Link>
                        <div className="nft__item_price">
                          <Skeleton width={90} height={20} borderRadius={0} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={30} height={15} borderRadius={0} />
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
                items={4}
                loop={true}
                nav={true}
                margin={12}
                responsive={state.responsive}
              >
                {items.map((item, index) => (
                  <div className="item" key={index}>
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

                      {item.expiryDate && (
                        <div className="de_countdown">
                          {<Countdown expiryDate={item.expiryDate} />}
                        </div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a
                                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a
                                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
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
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default NewItems;
