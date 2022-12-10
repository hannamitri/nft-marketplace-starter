import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();
  async function newItemsData() {
    setLoading(false);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNfts(data);
    setLoading(true);
  }

  useEffect(() => {
    newItemsData();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div className="small-border bg-color-2"></div> <h2>New Items</h2>
            </div>
          </div>
          {loading ? (
            <OwlCarousel className="owl-theme" {...options}>
              {nfts.map((nft, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={nft.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {nft.expiryDate && (
                    <Timer expiryDate={nft.expiryDate} />
                  )}
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
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="nft__item"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="author_list_pp">
                      <div
                        className="lazy skeleton-box"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 999,
                          borderWidth: 5,
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <div
                        className=" lazy nft__item_preview skeleton-box"
                        style={{ width: 280, height: 300, borderRadius: 10 }}
                      ></div>
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "100px" }}
                      ></div>
                    </div>
                    <div
                      className="nft__item_price skeleton-box"
                      style={{ width: "50px" }}
                    ></div>
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
