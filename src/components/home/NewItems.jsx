import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";
import useMinimumLoading from "../UI/useMinimumLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} hot-collections-arrow hot-collections-arrow-prev`}
      onClick={onClick}
      aria-label="Previous new items"
    >
      <i className="fa fa-angle-left" aria-hidden="true"></i>
    </button>
  );
};

const NextArrow = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} hot-collections-arrow hot-collections-arrow-next`}
      onClick={onClick}
      aria-label="Next new items"
    >
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </button>
  );
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayLoading = useMinimumLoading(loading, 700);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchNewItems() {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      const data = await response.json();
      setNewItems(data);
      setLoading(false);
    }
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <Slider {...sliderSettings}>
              {displayLoading
                ? new Array(4).fill(0).map((_, index) => (
                    <div key={index} style={{ padding: "0 12px" }}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft__item_wrap" style={{ marginTop: "8px" }}>
                          <Skeleton width="100%" height="200px" borderRadius="8px" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="80%" height="20px" borderRadius="4px" />
                          <Skeleton width="40%" height="15px" borderRadius="4px" />
                        </div>
                      </div>
                    </div>
                  ))
                : newItems.map((item) => (
                    <div key={item.id} style={{ padding: "0 12px" }}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.title}`}
                          >
                            <img className="lazy" src={item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
