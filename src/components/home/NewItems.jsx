import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [data, setData] = useState([]);

  // read in the data file
  async function getUsers() {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setData(response.data);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  // settings for sliders
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slideToShow: 4,
    SlidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
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

          {/* slider feature */}
          <Slider {...settings}>
            {data ? (
              data.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
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
                          src={item.authorImage}
                          alt="Author image"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {/* item.expiryDate need to convert to h m s */}
                    <div className="de_countdown">
                      {}h {}m {}s
                    </div>

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
                          alt="lazy image"
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">${item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // skeleton
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={"/"}>
                    <Skeleton width={"100%"} height={200} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={"/"}>
                    <Skeleton width={50} height={50} borderRadius={"50%"} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to={"/"}>
                    <Skeleton />
                  </Link>
                  <br />
                  <Skeleton width={60} height={20} />
                </div>
              </div>
            )}
          </Slider>
          {/* slider feature */}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
