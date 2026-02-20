import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css"; 

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchNewItems();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Slider {...settings}>
          {(loading ? Array.from({ length: 4 }) : items).map((item, index) => (
            <div key={index}>
              <div className="nft__item px-3">
                {loading ? (
                  <>
                    <div className="author_list_pp">
                      <div className="skeleton-circle" />
                    </div>
                    <div className="de_countdown skeleton-box" />
                    <div className="nft__item_wrap">
                      <div className="skeleton-box" style={{ height: "250px" }} />
                    </div>
                    <div className="nft__item_info">
                      <div className="skeleton-info" />
                      <div className="skeleton-info" style={{ width: "40%" }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage} alt="author" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      <Countdown date={item.expiryDate} />
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#"><i className="fa fa-facebook fa-lg" /></a>
                            <a href="#"><i className="fa fa-twitter fa-lg" /></a>
                            <a href="#"><i className="fa fa-envelope fa-lg" /></a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt="nft"
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
                  </>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewItems;
