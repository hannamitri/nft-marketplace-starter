import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Timer from "./Timer";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    fetchItems();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
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
            classID="owl-theme"
            margin={5}
            items={4}
            nav={true}
            dots={false}
            responsive={{
              0: {
                items: 1,
              },
              500: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="container skeleton__container" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp skeleton__author">
                        <img className="lazy " alt="" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="de_countdown skeleton-countdown" />
                      <div className="nft__item_wrap skeleton__wrap">
                        <div className="nft__item_extra skeleton__img" />
                      </div>
                      <div className="nft__item_info">
                        <h4 className="skeleton__title"></h4>
                        <div className="nft__item_price skeleton__price"></div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : items.map((items) => (
                  <div key={items.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${items.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={items.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {items.expiryDate ? (
                        <div className="de_countdown">
                          <Timer expiryDate={items.expiryDate} />{" "}
                        </div>
                      ) : null}
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

                        <Link to={`/item-details/${items.nftId}`}>
                          <img
                            src={items.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${items.nftId}`}>
                          <h4>{items.title}</h4>
                        </Link>
                        <div className="nft__item_price">{items.price}</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{items.likes}</span>
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
