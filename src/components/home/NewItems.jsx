import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import axios from "axios";
import $ from "jquery";
import jQuery from "jquery";
import OwlCarousel from "react-owl-carousel";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";
import "../../css/styles/owl.transitions.css";
if (typeof window !== "undefined") {
  if (!window.$) window.$ = $;
  if (!window.jQuery) window.jQuery = jQuery;
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    items: 4,
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1, nav: false },
      576: { items: 2, nav: false },
      768: { items: 3, nav: false },
      1200: { items: 4, nav: true },
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
  };

  async function fetchData() {
    setIsLoading(true);
    const fetchNewItems =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
    try {
      const { data } = await axios.get(fetchNewItems);
      setItems(data);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {isLoading ? (
            <OwlCarousel
              className="owl-theme"
              {...options}
              key={isLoading ? "loading" : "loaded"}
            >
              {[...Array(6)].map((_, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <a href="/">
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: "200px" }}
                        ></div>
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <a href="/">
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                      </a>
                      <br />
                      <div
                        className="skeleton-box"
                        style={{ width: "60px", height: "20px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <div data-aos="fade-up" data-aos-delay="100">
              <OwlCarousel
                className="owl-theme"
                {...options}
                key={isLoading ? "loading" : "loaded"}
              >
                {items.map((item, index) => (
                  <div className="nft__item" key={item.authorId}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
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
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;