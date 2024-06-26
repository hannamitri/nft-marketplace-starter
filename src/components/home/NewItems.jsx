import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; 
import CountDown from "../UI/CountDown";
import Skeleton from "react-loading-skeleton"; 
import ReactOwlCarousel from "react-owl-carousel"; 

const options = {
  items: 4,
  loop: true,
  margin: 10,
  nav: true,
  dots: true,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 4 }
  }
};

const NewItems = () => {
  const { id } = useParams();
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      try {
        console.log("fetching data..");
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
        console.log("data fetched:", data);
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching", error);
        setLoading(false);
      }
    }
    fetchNewItems();

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [id, loading]);

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
            <ReactOwlCarousel {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <Skeleton height={300} width={200} />
                  <div className="nft__item_info">
                    <Skeleton width={150} />
                    <div className="nft__item_price">
                      <Skeleton width={80} />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width={50} />
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          ) : (
            <ReactOwlCarousel {...options}>
              {newItems.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas">
                        <img className="lazy" src={item.authorImage} alt="Author" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      <CountDown endTime={item.expiryDate} />
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
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt="NFT"
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
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
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;