import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItem, setNewItem] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  async function fetchUsers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItem(data);
    setSkeleton(false);
  }

  useEffect(() => {
    fetchUsers();
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
          {skeleton ? (
            new Array(1).fill(0).map((_, index) => (
              <OwlCarousel
                key={index}
                loop
                nav
                dots={false}
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  900: { items: 3 },
                  1200: { items: 4 },
                }}
              >
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton borderRadius={50} height={50} width={50} />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="null" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="null" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="null">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Skeleton height="60%" width="100%" borderRadius={8}/>
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton height={20} width={100} borderRadius={4}/>
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton height={20} width={60} borderRadius={4}/>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton height={20} width={50} borderRadius={4}/>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            ))
          ) : (
            <OwlCarousel
              loop
              nav
              dots={false}
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                900: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {newItem.map((item, index) => (
                <div key={index}>
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
                    <div className="de_countdown">5h 30m 32s</div>

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
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
