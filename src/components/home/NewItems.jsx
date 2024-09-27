import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-owl-carousel";
import ExpiryTimer from "../UI/ExpiryTimer";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactOwlCarousel from "react-owl-carousel";
AOS.init();

const NewItems = (ExpiryTime) => {
  const [nft, setNft] = useState([]);
  const [img, setImg] = useState(true);

  useEffect(() => {
    async function fetchNfts() {
      setImg(false);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNft(data);
      setImg(true);
    }
    fetchNfts();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section
      id="section-items"
      className="no-bottom"
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-duration="500"
      data-aos-easing="ease-in"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="navigation-wrapper">
            <div className="">
              <>
                <ReactOwlCarousel {...options}>
                  {!img
                    ? nft.map((nft) => (
                        <div className="" key={nft.id}>
                          <div className="nft__item">
                            <div className="author_list_pp">
                              <Link
                                to={`/author/${nft.authorId}`}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Creator: Monica Lucas"
                              >
                                <img
                                  className="lazy"
                                  src={nft.authorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <ExpiryTimer expiryTime={nft.expiryDate} />

                            <div className="nft__item_wrap ">
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
                              <Link to={`/item-details/${nft.nftId}`}>
                                <img
                                  src={nft.nftImage}
                                  className="lazy nft__item_preview"
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="nft__item_info">
                              <Link to={`/item-details/${nft.nftId}`}>
                                <h4>{nft.title}</h4>
                              </Link>
                              <div className="nft__item_price">
                                {nft.price} ETH
                              </div>
                              <div className="nft__item_like">
                                <i className="fa fa-heart"></i>
                                <span>{nft.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : new Array(4).fill(0).map((_, index) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          key={index}
                        >
                          <div className="nft__item">
                            <div className="author_list_pp skeleton skeleton-box">
                              <div
                                to="/author"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Creator: Monica Lucas"
                              >
                                <img
                                  className="lazy"
                                  src={"AuthorImage"}
                                  alt=""
                                />
                              </div>
                            </div>

                            <div className="nft__item_wrap skeleton skeleton-box"></div>
                          </div>
                        </div>
                      ))}
                </ReactOwlCarousel>
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
