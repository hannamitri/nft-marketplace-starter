import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
const NewItems = () => {
  const [latestNft, setLatestNft] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    setLoading(false);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setLatestNft(data);
    setLoading(true);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const owlCarouselOptions = {
    item: 4,
    loop: true,
    nav: true,
    margin: 20,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
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

          <OwlCarousel className="owl-carousel" {...owlCarouselOptions}>
            {loading
              ? new Array(8).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={0} height={50} borderRadius={0} />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={275} height={350} borderRadius={0} />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width={0} height={35} borderRadius={0} />
                        <Skeleton width={160} height={30} borderRadius={0} />
                        <div className="nft__item_price">
                          {" "}
                          <Skeleton width={90} height={20} borderRadius={0} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={30} height={15} borderRadius={0} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : latestNft.slice(0, 6).map((latestNft, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${latestNft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={latestNft.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="de_countdown">5h 30m 32s</div>

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

                        <Link to={`/item-details/${latestNft.nftId}`}>
                          <img
                            src={latestNft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${latestNft.nftId}`}>
                          <h4>{latestNft.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {latestNft.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{latestNft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
