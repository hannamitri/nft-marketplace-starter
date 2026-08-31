import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import TimeLeft from "../UI/TimeLeft";

const ExploreItems = () => {
    const { explore, setSelectedItemId, loading, setSortOption } =
        useContext(DataContext);

    const [formattedTime, setFormattedTime] = useState("");

    const [cardCount, setCardCount] = useState(8);

    const loadMore = () => {
        setCardCount((prev) => prev + 4);
    };

    const handleChange = (event) => {
        setSortOption(event.target.value);
    };

    // console.log('setSortOption:', setSortOption);

    return (
        <>
            <div>
                <select
                    id="filter-items"
                    onChange={handleChange}
                    defaultValue=""
                >
                    <option value="">Default</option>
                    <option value="price_low_to_high">
                        Price, Low to High
                    </option>
                    <option value="price_high_to_low">
                        Price, High to Low
                    </option>
                    <option value="likes_high_to_low">Most liked</option>
                </select>
            </div>
            {loading
                ? Array(8)
                      .fill(0)
                      .map((_, index) => (
                          <div
                              key={index}
                              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              style={{
                                  display: "block",
                                  backgroundSize: "cover",
                              }}
                          >
                              <div className=" nft__item">
                                  <div className=" author_list_pp"></div>
                                  <div className="skeleton nft__item_wrap">
                                      <div className=" nft__item_extra">
                                          <div className="nft__item_buttons">
                                              <button>Buy Now</button>
                                              <div className="nft__item_share">
                                                  <h4>Share</h4>
                                                  <a
                                                      href=""
                                                      target="_blank"
                                                      rel="noreferrer"
                                                  >
                                                      <i className="fa fa-facebook fa-lg"></i>
                                                  </a>
                                                  <a
                                                      href=""
                                                      target="_blank"
                                                      rel="noreferrer"
                                                  >
                                                      <i className="fa fa-twitter fa-lg"></i>
                                                  </a>
                                                  <a href="">
                                                      <i className="fa fa-envelope fa-lg"></i>
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="skeleton nft__item_info">
                                      <div className="skeleton nft__item_price"></div>
                                      <div className="skeleton nft__item_like"></div>
                                  </div>
                              </div>
                          </div>
                      ))
                : explore.slice(0, cardCount).map((item, index) => (
                      <div
                          key={index}
                          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          style={{ display: "block", backgroundSize: "cover" }}
                      >
                          <div className="nft__item">
                              <div className="author_list_pp">
                                  <Link
                                      to={`/author/${item.authorId}`}
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                  >
                                      <img
                                          className="lazy"
                                          src={item.authorImage}
                                          alt=""
                                      />
                                      <i className="fa fa-check"></i>
                                  </Link>
                              </div>
                              {item.expiryDate && (
                                  <div className="de_countdown">
                                      <TimeLeft
                                          expiryDate={item.expiryDate}
                                          onFormatted={(timeString) =>
                                              setFormattedTime(timeString)
                                          }
                                      />
                                      {formattedTime}
                                  </div>
                              )}
                              <div className="nft__item_wrap">
                                  <div className="nft__item_extra">
                                      <div className="nft__item_buttons">
                                          <button>Buy Now</button>
                                          <div className="nft__item_share">
                                              <h4>Share</h4>
                                              <a
                                                  href=""
                                                  target="_blank"
                                                  rel="noreferrer"
                                              >
                                                  <i className="fa fa-facebook fa-lg"></i>
                                              </a>
                                              <a
                                                  href=""
                                                  target="_blank"
                                                  rel="noreferrer"
                                              >
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
                                          alt=""
                                      />
                                  </Link>
                              </div>
                              <div className="nft__item_info">
                                  <Link to="/item-details">
                                      <h4>{item.title}</h4>
                                  </Link>
                                  <div className="nft__item_price">
                                      {item.price} ETH
                                  </div>
                                  <div className="nft__item_like">
                                      <i className="fa fa-heart"></i>
                                      <span>{item.likes}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
            {cardCount < explore.length && (
                <div className="col-md-12 text-center">
                    <Link
                        to=""
                        id="loadmore"
                        className="btn-main lead"
                        onClick={loadMore}
                    >
                        Load more
                    </Link>
                </div>
            )}
        </>
    );
};

export default ExploreItems;
