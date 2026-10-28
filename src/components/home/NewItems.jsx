import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import ItemCountdown from "./ItemCountdown";
import { fetchNewItems } from "./newItemsData";
import "slick-carousel/slick/slick.css";
import "./NewItems.css";

const ItemArrow = ({ direction, onClick }) => (
  <button type="button" className={`new-items-arrow new-items-arrow--${direction}`}
    aria-label={`${direction === "next" ? "Next" : "Previous"} new item`}
    onClick={onClick} disabled={!onClick}>
    <span aria-hidden="true">{direction === "next" ? "›" : "‹"}</span>
  </button>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const carouselRef = useRef(null);

  const syncSlideAccessibility = useCallback(() => {
    if (!carouselRef.current) return;
    const track = carouselRef.current.querySelector(".slick-track");
    if (track) {
      track.setAttribute("role", "list");
      track.setAttribute("aria-label", "New item cards");
    }
    // Slick hides offscreen slides, but their links also need to leave tab order.
    carouselRef.current.querySelectorAll(".slick-slide").forEach((slide) => {
      slide.querySelectorAll("a").forEach((link) => {
        link.tabIndex = slide.getAttribute("aria-hidden") === "true" ? -1 : 0;
      });
    });
  }, []);

  useEffect(syncSlideAccessibility, [status, syncSlideAccessibility]);

  useEffect(() => {
    const controller = new AbortController();
    fetchNewItems(controller.signal).then((records) => {
      if (!controller.signal.aborted) {
        setItems(records);
        setStatus("ready");
      }
    }).catch(() => {
      if (!controller.signal.aborted) setStatus("error");
    });
    return () => controller.abort();
  }, []);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: items.length > 4,
    arrows: items.length > 4,
    dots: false,
    autoplay: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    responsive: [
      { breakpoint: 991, settings: { slidesToShow: 2, infinite: items.length > 2, arrows: items.length > 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1, infinite: items.length > 1, arrows: items.length > 1 } },
    ],
    prevArrow: <ItemArrow direction="previous" />,
    nextArrow: <ItemArrow direction="next" />,
    onInit: syncSlideAccessibility,
    onReInit: syncSlideAccessibility,
    afterChange: syncSlideAccessibility,
  };

  return (
    <section id="section-items" className="no-bottom" aria-labelledby="new-items-heading">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 id="new-items-heading">New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="col-12">
            {status === "loading" ? (
              <div role="status" aria-label="Loading new items" aria-busy="true">
                <div className="new-items-skeletons" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div className="new-items-slide" key={index}>
                      <div className="nft__item">
                        <div className="new-item-header"><Skeleton width="50px" height="50px" borderRadius="50%" /></div>
                        <div className="nft__item_wrap"><Skeleton width="100%" height="100%" borderRadius="8px" /></div>
                        <Skeleton width="70%" height="20px" borderRadius="4px" />
                        <div className="new-item-footer"><Skeleton width="40%" height="20px" borderRadius="4px" /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : status === "error" ? (
              <p role="alert" className="text-center">Unable to load new items. Please try again later.</p>
            ) : items.length === 0 ? (
              <p role="status" className="text-center">No new items available.</p>
            ) : (
              <div ref={carouselRef}>
                <Slider {...settings} className="new-items-slider">
                  {items.map((item) => (
                    <div className="new-items-slide" key={item.nftId} role="listitem">
                      <article className="nft__item" aria-label={item.title}>
                        <div className="new-item-header">
                          <img className="new-item-author" src={item.authorImage} alt={`Author of ${item.title}`} />
                          <ItemCountdown expiryDate={item.expiryDate} />
                        </div>
                        <div className="nft__item_wrap">
                          <Link to={`/item-details/new/${item.nftId}`}>
                            <img src={item.nftImage} className="nft__item_preview" alt={item.title} />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/new/${item.nftId}`}><h4>{item.title}</h4></Link>
                          <div className="new-item-footer">
                            <div className="nft__item_price">{item.price} ETH</div>
                            <div className="nft__item_like" aria-label={`${item.likes} likes`}>
                              <i className="fa fa-heart" aria-hidden="true"></i><span>{item.likes}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
