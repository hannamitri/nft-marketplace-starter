import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../UI/Countdown";
import ItemShareButtons from "../UI/ItemShareButtons";
import { sliderOptions } from "../UI/sliderOptions";
import { getNewItems } from "../../api/nft";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider(sliderOptions);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItems(await getNewItems());
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-right">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <div className="keen-slider skeleton-slider">
                  {new Array(4).fill(0).map((_, index) => (
                    <div
                      className="keen-slider__slide skeleton-slide"
                      key={index}
                    >
                      <div className="nft__item skeleton-nft-item">
                        <div className="skeleton skeleton-author"></div>
                        <div className="skeleton skeleton-countdown"></div>
                        <div className="skeleton skeleton-nft-image"></div>

                        <div className="skeleton-nft-info">
                          <div className="skeleton skeleton-nft-title"></div>
                          <div className="skeleton skeleton-nft-price"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <button
                  type="button"
                  className="carousel-arrow carousel-arrow-left"
                  onClick={() => slider.current?.prev()}
                  aria-label="Previous item"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <div ref={sliderRef} className="keen-slider">
                  {items.map((item) => (
                    <div className="keen-slider__slide" key={item.nftId}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="View author"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt="Author"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <Countdown expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <ItemShareButtons />

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title || "NFT"}
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>

                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>

                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="carousel-arrow carousel-arrow-right"
                  onClick={() => slider.current?.next()}
                  aria-label="Next item"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
