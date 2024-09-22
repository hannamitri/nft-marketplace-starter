import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import CountDown from "../UI/CountDown";

const NewItems = () => {
  const [nftCollections, setNftCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carouselResponsiveness = {
    0: {
      items: 1,
      nav: true,
    },
    478: {
      items: 2,
      nav: true,
    },
    768: {
      items: 3,
      nav: true,
      loop: true,
    },
    1200: {
      items: 4,
      nav: true,
      loop: true,
    },
  };

  useEffect(() => {
    async function fetchNewCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
        setIsLoading(false);
        setNftCollection(data);
    }
    fetchNewCollections();
  }, []);

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
          {isLoading ? (
            <OwlCarousel
              nav
              margin={10}
              items={4}
              dots={false}
              responsive={carouselResponsiveness}
            >
              {new Array(6).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div className="carousel__image--author"></div>
                      <i className="fa fa-check"></i>
                    </div>
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

                      <div className="carousel__new-items--skeleton"></div>
                    </div>
                    <div className="nft__item_info">
                      <h4 className="carousel__new-items--title"></h4>
                      <div className="nft__item_price carousel__new-items--price"></div>
                      <div className="nft__item_like carousel_nft__item_like--skeleton"></div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            nftCollections.length > 1 && (
              <OwlCarousel
                loop
                nav
                margin={10}
                items={4}
                dots={false}
                responsive={carouselResponsiveness}
              >
                {nftCollections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${collection.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <img
                            className="lazy"
                            src={collection.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {collection.expiryDate > 0 ? (
                        <div className="de_countdown">
                          <CountDown
                            duration={collection.expiryDate - Date.now()}
                          />
                        </div>
                      ) : null}

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

                        <Link to={`/item-details/${collection.id}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {collection.price}
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{collection.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
