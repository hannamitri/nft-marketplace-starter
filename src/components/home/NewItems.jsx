import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchNewItems() {
    setLoading(true)
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  function timer() {}

  const responsiveness = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
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

 anson-newItems
          {loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={10}
              responsive={responsiveness.responsive}
            >
              {items.map((data) => (
                <div className="" key={data.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {data.expiryDate && (
                      <div className="de_countdown">
                        <Countdown time={data.expiryDate} />
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
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
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={10}
              responsive={responsiveness.responsive}
            >
              {new Array(1).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown">
                      <Skeleton width={90} height={10} borderRadius={8} />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width={500} height={260} borderRadius={8} />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width={150} />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton width={75} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={25} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
