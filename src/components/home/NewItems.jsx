import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleSlider from "../UI/SimpleSlider";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const newItemsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(newItemsUrl);
      setNewItems(data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewItems();
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
          <SimpleSlider>
            {loading
              ? [1, 2, 3, 4].map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to={``}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={``}>
                        <Skeleton width="100%" height="350px" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={``}>
                        <Skeleton width="180px" height="30px" />
                      </Link>
                      <Skeleton width="100px" height="20px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="30px" height="15px" />
                    </div>
                  </div>
                ))
              : newItems.map((item, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorId}`}
                        >
                          <img className="lazy" src={item.authorImage} alt={item.authorId} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {/* Live Countdown Component */}
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
                            alt={item.title}
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
          </SimpleSlider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
