import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import TimerLogic from "../functions/TimerLogic";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  async function responseItems() {
    setLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setUsers(data);
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }

  useEffect(() => {
    responseItems();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    dots: false,
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
      1400: {
        items: 4,
      },
    },
  };

  const [users, setUsers] = useState([]);

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
            className="owl-theme owl-style"
            items={4}
            lazyLoad
            merge
            {...options}
          >
            {loading ? (
              <div className="nft__item">
                <div className="skeleton nft__coll--skeleton skeleton-style">
                  <div className="skeleton-box nft__img--skeleton nft__newItem--position"></div>
                  <div className="skeleton-box"></div>
                </div>
                <figure className="check--skeleton nft__newItem--pp--position">
                  <i className="fa fa-check fa-check--skeleton nft__newItem--checkmark--position"></i>
                </figure>
                <div className="nft__detail--container">
                  <div className="skeleton nft__name-skeleton skeleton-box"></div>
                  <div className="skeleton nft__id--skeleton skeleton-box"></div>
                  <div className="nft__detail--container-heart">
                    <div className="skeleton-box heart--skeleton"></div>
                  </div>
                </div>
              </div>
            ) : (
              users.map((user, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${user.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={user.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {user.expiryDate ? (
                      <div className="de_countdown">
                        <div>
                          <TimerLogic expiryDate={user.expiryDate} />
                        </div>
                      </div>
                    ) : (
                      <div className="de_countdown hidden__timer"></div>
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

                      <Link to={`/item-details/${user.nftId}`}>
                        <img
                          src={user.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{user.title}</h4>
                      </Link>
                      <div className="nft__item_price">{user.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{user.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;