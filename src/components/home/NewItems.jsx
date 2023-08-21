import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel"; // Import the OwlCarousel component
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Countdown from "./Countdown";

const NewItems = () => {
  const [newNFTs, setNewNFTs] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchNewNFTs() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewNFTs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewNFTs();
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
          {newNFTs.length > 0 && !loading ? (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={10}
              nav
              dots={false}
              responsive={{
                0: { items: 1 },
                500: { items: 2 },
                768: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {newNFTs.map((newNFT, index) => (
                <div
                  // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={newNFT.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown info={newNFT}></Countdown>
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

                      <Link to="/item-details">
                        <img
                          src={newNFT.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newNFT.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newNFT.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newNFT.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    {/* <Skeleton width={60} height={60} borderRadius={9999} /> */}
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="100%" borderRadius={5} />
                  </div>
                  <div className="nft__item_info" style={{ marginTop: "15px" }}>
                    <div className="nft__item_price">
                      <Skeleton width="40%" height={20} borderRadius={5} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
