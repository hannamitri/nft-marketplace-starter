import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import sliderSettings from "../Animations/silder";
import "../../css/styles/skeleton.css";
import Countdown from "../Animations/Countdown";

const NewItems = () => {
  const [collections, setNewDataCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewData() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewDataCollections(response.data);
      } catch (err) {
        console.log("Failed to get data...");
      } finally {
        setLoading(false);
      }
    }
    fetchNewData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {(loading ? Array(4).fill({}) : collections).map((item, index) => (
            <div key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  {loading ? (
                    <div className="skeleton skeleton-author" />
                  ) : (
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img
                        className="lazy"
                        src={item.authorImage || AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  )}
                </div>

                {loading ? (
                  <div className="de_countdown">
                    <div className="skeleton skeleton-countdown" />
                  </div>
                ) : (
                  item.expiryDate && (
                    <div className="de_countdown">
                      <Countdown expiryDate={item.expiryDate} />
                    </div>
                  )
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      {loading ? (
                        <div className="skeleton skeleton-button" />
                      ) : (
                        <button>Buy Now</button>
                      )}
                    </div>
                  </div>

                  {loading ? (
                    <div className="skeleton skeleton-image" />
                  ) : (
                    <Link to={`/item-detail/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  )}
                </div>

                <div className="nft__item_info">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-title" />
                      <div className="skeleton skeleton-price" />
                      <div className="skeleton-likes-wrapper">
                        <div className="skeleton skeleton-likes" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to={`/item-detail/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {item.price ? `${item.price} ETH` : "--"}
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes || 0}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewItems;
