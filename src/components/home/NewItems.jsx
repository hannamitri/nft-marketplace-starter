import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from "../CountDown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  const getExploreData = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      setNewItems(response.data);

      console.log(response.data);

    } catch (error) {
      console.error("Error fetching New Items", error);
    }
  };

  useEffect(() => {
    getExploreData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
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
          <div className="col-12">
            <Slider {...settings}>
              {newItems.length > 0
                ? newItems.map((item, index) => (

                    <div className="col-xs-12"  

                      key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId || ""}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                    <Countdown expiryDate={item.expiryDate} />
                  )}
                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${item.nftId || ""}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                          
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId || ""}`}>
                            <h4>{item.title || "No Title"}</h4>
                          </Link>
                          <div className="nft__item_info-text">
                            <div className="nft__item_price">
                              {item.price || "No Price"} ETH
                            </div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart"></i>
                              <span>{item.likes || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(4).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="skeleton-nft-card">
                  <div className="skeleton-nft-card-img-area">
                    <div className="skeleton-nft-card-avatar"></div>
                    <div className="skeleton-nft-card-check">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="skeleton-nft-card-img"></div>
                  </div>
                  <div className="skeleton-nft-card-row skeleton-nft-card-row-lg"></div>
                  <div className="skeleton-nft-card-footer">
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-xs"></div>
                  </div>
                </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
