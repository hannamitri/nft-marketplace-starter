import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../CountdownTimer";

const NewItems = () => {
  const [newItemsList, setNewItemsList] = useState();
  const [loaded, setLoaded] = useState(false);
  const [currDate, setCurrDate] = useState(Date.now());

  //fetching new items data using axios
  async function getNewItemsData() {
    return await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
  }

  //owl carousel
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };

  useEffect(() => {
    const apiResp = getNewItemsData();
    apiResp
      .then((resp) => {
        setNewItemsList(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (newItemsList) {
      setLoaded(true);
    }
  }, [newItemsList]);

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
          {newItemsList ? (
            <OwlCarousel className="owl-theme" {...options}>
              {newItemsList.map((element) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hotCollectionContainer"
                  key={element.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={element.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {element.expiryDate - currDate > 0 && (
                      <div className="de_countdown">
                        <CountdownTimer targetDate={element.expiryDate} />
                      </div>
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
                          src={element.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{element.title}</h4>
                      </Link>
                      <div className="nft__item_price">{element.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{element.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hotCollectionContainer">
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <Skeleton
                        width="60px"
                        height="60px"
                        borderRadius="999px"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    <Skeleton width="10%" height="24px" />
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

                    <Link to="/item-details">
                      <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="0.5rem"
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <Skeleton width="75%" height="24px" />
                    </Link>
                    <Skeleton width="50%" height="24px" />
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>69</span>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
