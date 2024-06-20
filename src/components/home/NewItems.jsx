import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Timer from "./Timer";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function NewItemSkeletonHTML() {
  return (
    <div className="nft__item nft__item_wrap new-item__skel_wrap">
      <div className="skeleton-box new-item__img-skel"></div>
      <div className="new-item__skel_info-wrap">
        <div className="skeleton-box new-item__name-skel"></div>
        <div className="new-item__skel_info-wrap2">
          <div className="skeleton-box new-item__price-skel"></div>
          <div className="skeleton-box new-item__like-skel"></div>
        </div>
      </div>
    </div>
  );
}

function NewItemSkeleton() {
  let width = window.innerWidth;
  if (width >= 992) {
    return (
      <div style={{ display: "flex" }}>
        <NewItemSkeletonHTML />
        <NewItemSkeletonHTML />
        <NewItemSkeletonHTML />
        <NewItemSkeletonHTML />
      </div>
    );
  } else if (width >= 576) {
    return (
      <div style={{ display: "flex" }}>
        <NewItemSkeletonHTML />
        <NewItemSkeletonHTML />
      </div>
    );
  } else {
    return <NewItemSkeletonHTML />;
  }
}

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setData(data);
    setLoading(false);
    //console.log(data)
  }

  useEffect(() => {
    fetchData();
  });

  //Slider Settings
  var settings = {
    infinite: true,
    speed: 150,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
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
          {loading ? (
            <NewItemSkeleton />
          ) : (
            <Slider {...settings} className="slider-wrapper">
              {data.map((item) => (
                <div className="new-item__card" key={item.id}>
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

                    {item.expiryDate ? (
                      <div className="de_countdown">
                        <Timer expiryTime={item.expiryDate} />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="/">
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
                        <span>{item.like}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;