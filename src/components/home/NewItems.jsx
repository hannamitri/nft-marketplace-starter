import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import { FaCheckCircle } from "react-icons/fa";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    }
    fetchNewItems();
  }, []);

  const responsive = {
    1440: {
      items: 4,
    },
    1000: {
      items: 3,
    },
    700: {
      items: 2,
    },
    300: {
      items: 1,
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
          {loading ? (
            new Array(1).fill(0).map((index) => (
              <OwlCarousel
                className=""
                loop
                margin={10}
                responsive={responsive}
                items={4}
                dots={false}
                nav
              >
                <div className="card-skeleton" key={index}>
                  <div className="circle__skeleton">
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <FaCheckCircle className="check-circle__skeleton" color="#8364E2" />
                  <div className="left-col">
                    <Skeleton square height={270} width={500} />
                  </div>
                  <div className="name__skeleton">
                    <Skeleton width="40%" height={20} />
                  </div>
                  <div className="code__skeleton">
                    <Skeleton width="80" height={20}/>
                  </div>
                </div>
              </OwlCarousel>
            ))
          ) : (
          <OwlCarousel
            className=""
            loop
            margin={10}
            responsive={responsive}
            items={4}
            dots={false}
            nav
          >
            {newItems.slice(0, 7).map((newItems, _) => (
              <div className="" key={newItems.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${newItems.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creater: Monica Lucas"
                    >
                      <img className="lazy" src={newItems.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {newItems.expiryDate && (
                    <div className="de_countdown">
                      <CountdownTimer expiryDate={newItems.expiryDate}/>
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

                    <Link to={`/item-details/${newItems.nftId}`}>
                      <img
                        src={newItems.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{newItems.title}</h4>
                    </Link>
                    <div className="nft__item_price">{newItems.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{newItems.likes}</span>
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
