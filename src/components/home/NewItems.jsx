import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CountdownTimer from "../CountdownTimer";
import AOS from "aos";
import 'aos/dist/aos.css';

const SkeletonLoader = () => (
  <div className="nft__item">
    <div className="skeleton-check-image">
      <i className="fa fa-check"></i>
      <div className="skeleton-box skeleton-image-fluid"></div>
      <div className="skeleton-pp-coll skeleton-box"></div>
    </div>
    <div className="skeleton-art-title skeleton-box"></div>
    <div className="price-likes-display">
      <div className="skeleton-title skeleton-box"></div>
      <div className="skeleton-likes-title skeleton-box"></div>
    </div>
  </div>
);

const NewItems = () => {
  const [itemsCarousel, setItemsCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  async function newItemsData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItemsCarousel(data);
    setLoading(false);
  }

  useEffect(() => {
    newItemsData();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      }
    }
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-out" data-aos-duration="1000">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonLoader />
                  </div>
                ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                data-aos="zoom-out"
                data-aos-duration="800"
                className="owl-theme"
                {...carouselOptions}
              >
                {itemsCarousel.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.creatorName}`}
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}
                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
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
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
