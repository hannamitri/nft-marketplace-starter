import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import CountDownTimer from "../UI/CountDownTimer";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [loadingItems, setLoadingItems] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState();

  async function fetchNewItems() {
    setLoadingSkeleton(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setLoadingItems(data);
    setLoadingSkeleton(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  // Carousel Settings for Hot Collections
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "100%",
          transform: "scale(2)",
          opacity: 0.6,
          marginRight: "16px",
          zIndex: "999",
        }}
        onClick={onClick}
      ></div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "100%",
          transform: "scale(2 )",
          opacity: 0.6,
          marginLeft: "16px",
          zIndex: "999",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
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
            {loadingItems.map((items) => (
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-10"
                key={items.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    {loadingSkeleton ? (
                      <Skeleton
                        width={"100%"}
                        height={"50px"}
                        borderRadius={"240px"}
                      />
                    ) : (
                      <Link
                        to={`/author/${items.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={items.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    )}
                  </div>
                  {loadingSkeleton ? (
                    <Skeleton />
                  ) : (
                    <div>
                      {items.expiryDate <= 0 ? (
                        <p className="d-none"></p>
                      ) : (
                        <CountDownTimer items={[items]} />
                      )}
                    </div>
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
                    {loadingSkeleton ? (
                      <Skeleton width={"100%"} height={"120px"} />
                    ) : (
                      <Link to="">
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>
                  <div className="nft__item_info">
                    {loadingSkeleton ? (
                      <Skeleton
                        width={"70%"}
                        height={"15px"}
                        borderRadius={"24px"}
                      />
                    ) : (
                      <>
                        <Link to="/item-details">
                          <h4>{items.title}</h4>
                        </Link>
                        <div className="nft__item_price">{items.price}</div>
                      </>
                    )}
                    <div className="nft__item_like">
                      {loadingSkeleton ? (
                        <>
                          <Skeleton
                            width={"100%"}
                            height={"15px"}
                            borderRadius={"24px"}
                          />
                          <i style={{ width: "10px" }}> </i>
                          <span></span>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-heart"></i>
                          <span>{items.likes}</span>
                        </>
                      )}
                    </div>
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
