
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDown from "../UI/CountDown";
import "./NewItems.css"

const NewItems = () => {
  const [options, setOptions] = useState({});
  const [sliderRef, instanceRef] = useKeenSlider(options);
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow-lefts" : "arrow-rights"}`}
      >
        {props.left && <KeyboardArrowLeftIcon />}
        {!props.left && <KeyboardArrowRightIcon />}
      </svg>
    );
  }

  async function fetchNewItems() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
    setOptions({
      loop: true,
      mode: "free-snap",
      breakpoints: {
        "(min-width: 0px)": {
          slidesPerView: 1,
        },
        "(min-width: 600px)": {
          slides: {
            perView: 2,
            spacing: 24,
          },
        },
        "(min-width: 1000px)": {
          slides: {
            perView: 4,
            spacing: 24,
          },
        },
      },
    });
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="500">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {new Array(7).fill(0).map((_, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <Link to="">
                        <Skeleton width="100%" height="340px" />
                      </Link>
                      <div className="nft__item_info">
                        <Link to="">
                          <Skeleton width="150px" height="30px" />
                        </Link>
                        <div></div>
                        <Skeleton width="100px" height="20px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="40px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="arrow_buttons">
                <Arrow left onClick={() => instanceRef.current?.prev()} />
                <Arrow onClick={() => instanceRef.current?.next()} />
              </div>
            </div>
          ) : (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {newItems.map((item, id) => (
                  <div className="keen-slider__slide" key={id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={item.title}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate ? (
                        <CountDown expiryDate={item.expiryDate} />
                      ) : (
                        ""
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a
                                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a
                                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
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
              </div>
              <div className="arrow_buttons">
                <Arrow left onClick={() => instanceRef.current?.prev()} />
                <Arrow onClick={() => instanceRef.current?.next()} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;