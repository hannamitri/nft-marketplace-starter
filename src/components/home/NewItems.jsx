import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components-css/ReactSlickSlider.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Countdown from "../UI/Countdown";
import api from "../UI/Api";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  function ArrowNext(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`arrow ${className}`}
        onClick={onClick}
        style={{
          ...style,
          position: "absolute",
          right: "-12px",
          top: "50%",
          display: "flex",
        }}
      >
        <AiOutlineArrowRight className="arrows" style={{ color: "black" }} />
      </div>
    );
  }
  function ArrowPrev(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`arrow ${className}`}
        style={{
          ...style,
          position: "absolute",
          left: "-12px",
          top: "50%",
          display: "flex",
        }}
        onClick={onClick}
      >
        <AiOutlineArrowLeft className="arrows" style={{ color: "black" }} />
      </div>
    );
  }

  var settings = {
    margin: 10,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "slides",
    nextArrow: <ArrowNext to="next" />,
    prevArrow: <ArrowPrev to="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const data = await api.get("/newItems");
        setNewItems(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load new items");
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
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
            <div className="row">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={`loading-${index}`}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton-wrapper">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="100px"
                          />
                        </div>
                      </div>
                      <div className="de_countdown-skeleton skeleton-wrapper">
                        <Skeleton
                          width="112.86px"
                          height="32px"
                          borderRadius="30px"
                        />
                      </div>
                      <div className="nft__item_wrap">
                        <div className="skeleton-wrapper">
                          <Skeleton width="274.5px" height="240px" />
                        </div>
                      </div>
                      <div className="nft__item_info">
                        <div className="skeleton-wrapper">
                          <Skeleton width="260px" height="49px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Slider {...settings}>
              {newItems.map((elem, id) => (
                <div className="nft__item" key={id}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${elem.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator:${elem.authorId}`}
                    >
                      <img className="lazy" src={elem.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <Countdown expiryDate={elem.expiryDate}/>
                  <div className="nft__item_wrap">
                    <Link to="/item-details">
                      <img
                        src={elem.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                        style={{
                          maxWidth: "400px",
                          maxHeight: "240px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{elem.title}</h4>
                    </Link>
                    <div className="nft__item_price">{elem.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{elem.likes}</span>
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

