import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItemCard from "../UI/NewItemCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems(data);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 2000);
  }, []);

  async function sortedCards(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setLoading(true);
    setTimeout(() => {
      setExploreItems(data);
      setLoading(false);
    }, 1500);
  }

  function loadMore() {
    setVisibleItems((prevCount) => prevCount + 4);
    if (visibleItems === 12) {
      setLoadMoreBtn(false);
    }
  }

  return (
    <>
      <div>
        <select
          onChange={(event) => sortedCards(event.target.value)}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {!loading
        ? exploreItems.slice(0, visibleItems).map((explore, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div
                style={{
                  paddingRight: "12px",
                  paddingLeft: "12px",
                  maxWidth: "initial",
                }}
                className="nft__item"
              >
                <NewItemCard
                  key={explore.id}
                  nftId={explore.nftId}
                  nftImage={explore.nftImage}
                  authorImage={explore.authorImage}
                  likes={explore.likes}
                  price={explore.price}
                  title={explore.title}
                  authorId={explore.authorId}
                  expiryDate={explore.expiryDate}
                />
              </div>
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => {
            return (
              <div
                className="col-lg-3 col-md-6 col-xs-12 explore-extra"
                key={index}
              >
                <div
                  style={{
                    paddingRight: "12px",
                    paddingLeft: "12px",
                    maxWidth: "initial",
                    margin: "0 auto",
                    marginBottom: "25px",
                  }}
                  className="nft__item"
                >
                  <div className="author_list_pp">
                    <div
                      className="lazy skeleton-box"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                      }}
                    ></div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div
                    className="de_countdown skeleton-box"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      border: "none",
                      width: "40%",
                      height: "28px",
                    }}
                  ></div>
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
                    <div
                      className="lazy nft__item_preview skeleton-box skeleton-img-explore"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        height: "220px",
                      }}
                    ></div>
                  </div>
                  <div className="nft__item_info">
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        width: "100px",
                        height: "20px",
                      }}
                    ></div>
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        width: "60px",
                        height: "20px",
                        marginTop: "10px",
                      }}
                      className="nft__item_price"
                    ></div>
                    <div className="nft__item_like">
                      <div
                        className="skeleton-box"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          borderRadius: "5px",
                          width: "30px",
                          height: "20px",
                          marginBottom: "10px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      {!loading ? (
        loadMoreBtn ? (
          <div className="col-md-12 text-center">
            <Link
              onClick={loadMore}
              to=""
              id="loadmore"
              className="btn-main lead"
            >
              Load more
            </Link>
          </div>
        ) : null
      ) : (
        <div className="col-md-12 text-center">
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "rgba(0, 0, 0, 0)",
              margin: "10px 0px 0px",
              padding: "22px 75px",
            }}
            to=""
            id="loadmore"
            className="btn-main lead skeleton-box skeleton-hover-style"
          ></div>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
