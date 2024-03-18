import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import MediaQuery from "react-responsive";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
    console.log(data);
  }, []);

  function convertTime(time) {
    let dateObj = new Date(time * 1000);
    // Get hours from the timestamp
    let hours = dateObj.getUTCHours();

    // Get minutes part from the timestamp
    let minutes = dateObj.getUTCMinutes();

    // Get seconds part from the timestamp
    let seconds = dateObj.getUTCSeconds();

    let formattedTime =
      hours.toString() +
      "h " +
      minutes.toString().padStart(2, "0") +
      "m " +
      seconds.toString().padStart(2, "0") +
      "s";

    return formattedTime;
  }

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
          {loading ? (
            <div className="skeleton-container">
              <MediaQuery minWidth={0}>
                <Skeleton />
              </MediaQuery>
              <MediaQuery minWidth={576}>
                <Skeleton />
              </MediaQuery>
              <MediaQuery minWidth={768}>
                <Skeleton />
              </MediaQuery>
              <MediaQuery minWidth={1024}>
                <Skeleton />
              </MediaQuery>
            </div>
          ) : (
            <div className="carousel-container">
              <Slider {...settings}>
                {data.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
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
                      {item.expiryDate ? (
                        <div className="de_countdown">
                          {convertTime(item.expiryDate)}
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
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
