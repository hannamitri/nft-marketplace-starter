import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NewItemsSkeleton from "../UI/NewItemsSkeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);

      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchItems();
  }, []);

  const slidesToShow = width < 768 ? 1 : width < 992 ? 2 : width < 1200 ? 3 : 4;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) {
    return <NewItemsSkeleton />;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div data-aos="fade-up" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id} className="px-2">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator"
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                   <Countdown expiryDate={item.expiryDate} />
               
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>

                          <div className="nft__item_share">
                            <h4>Share</h4>

                            <button
                              type="button"
                              className="share-button"
                              aria-label="Share on Facebook"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </button>

                            <button
                              type="button"
                              className="share-button"
                              aria-label="Share on Twitter"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </button>

                            <button
                              type="button"
                              className="share-button"
                              aria-label="Share by Email"
                            >
                              <i className="fa fa-envelope fa-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
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
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
