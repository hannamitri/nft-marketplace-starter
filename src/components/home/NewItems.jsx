import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { getNewItems } from "../../api/newitems";
import CountdownTimer from "../../functions/countdown";
import { Skeleton } from "@mui/material";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowRight
      className={className}
      style={{
        ...style,
        hoverscale: "10%",
        position: "absolute",
        zIndex: "1",
        right: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowLeft
      className={className}
      style={{
        ...style,
        position: "absolute",
        zIndex: "1",
        left: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const newItems = await getNewItems();
      setLoading(false);
      setNewItems(newItems);
    }
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

          <Slider {...settings}>
            {newItems.map((newItem) => (
              <div className="" key={newItem.id}>
                <div className="nft__item mx-2">
                  <div className="author_list_pp">
                    {loading ? (
                      <Skeleton variant="circular" width={50} height={50} />
                    ) : (
                      <Link
                        to={{
                          pathname: `/author/${newItem.authorId}`,
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newItem.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    )}
                  </div>
                  {newItem.expiryDate !== null &&
                    (loading ? (
                      ""
                    ) : (
                      <div className="de_countdown">
                        <CountdownTimer targetTime={newItem.expiryDate} />
                      </div>
                    ))}

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
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <Link
                        to={{
                          pathname: `/item-details/${newItem.authorId}`,
                        }}
                      >
                        <img
                          src={newItem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>
                  <div className="nft__item_info">
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <Link to="/item-details">
                        <h4>{newItem.title}</h4>
                      </Link>
                    )}
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <div>
                        <div className="nft__item_price">
                          {newItem.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
