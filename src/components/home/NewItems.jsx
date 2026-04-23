import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch new items.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const renderSkeletonCard = (index) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`new-item-skeleton-${index}`}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="de_countdown">
          <Skeleton width="90px" height="18px" borderRadius="4px" />
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="260px" borderRadius="8px" />
        </div>
        <div className="nft__item_info">
          <Skeleton width="70%" height="20px" borderRadius="4px" />
          <div className="mt-2">
            <Skeleton width="40%" height="16px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading && Array.from({ length: 4 }).map((_, index) => renderSkeletonCard(index))}
          {!loading && error && <div className="col-lg-12 text-center text-danger">{error}</div>}
          {!loading && !error && (
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="120">
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {items.map((item, index) => (
                  <div
                    className="nft__item"
                    key={item.id}
                    data-aos={isMobile ? "fade-up" : (index % 3 === 0 ? "zoom-in-up" : "fade-up")}
                    data-aos-delay={isMobile ? (index % 3) * 35 : index * 65}
                  >
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator ID: ${item.authorId}`}
                      >
                        <img className="lazy" src={item.authorImage} alt={item.title?.trim() || "Author"} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <CountdownTimer expiryDate={item.expiryDate} />

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

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title?.trim() || "NFT item"}
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title?.trim()}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
