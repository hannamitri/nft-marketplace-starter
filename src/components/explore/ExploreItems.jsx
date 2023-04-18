import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/home css/explore.css";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState(8);
  const [disabled, setDisabled] = useState(false);
  const [filter, setFilter] = useState()

  async function fetchData() {
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );

    setExploreItems(response.data);
    // console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function filterBooks(filter) {
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(response.data);
    // console.log(response.data);
    setLoading(false);
  }   

  function loadMore() {
    setNfts(nfts + 4);
    console.log(nfts);
    if (nfts === 12) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(event) => filterBooks(event.target.value)}
          defaultValue={""}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="explore__wrapper">
        {loading
          ? new Array(8).fill(0).map((_, index) => (
              <div className="explore__loading" key={index}>
                <div className="new__items-loading-author-wrapper">
                  <div className="new__items-loading-author"></div>
                </div>
                <div className="new__items-loading-author-text-wrapper">
                  <div className="new__items-loading-author-text"></div>
                  <div className="new__items-loading-author-mini-text-wrapper">
                    <div className="new__items-loading-author-mini-text"></div>
                    <div className="new__items-loading-likes"></div>
                  </div>
                </div>
              </div>
            ))
          : exploreItems.slice(0, nfts).map((response, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${response.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={response.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {/* <div className="de_countdown">5h 30m 32s</div> */}

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
                    <Link to={`/item-details/${response.nftId}`}>
                      <img
                        src={response.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{response.title}</h4>
                    </Link>
                    <div className="nft__item_price">{response.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{response.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="col-md-12 text-center">
        <Link to="">
          {disabled ? (
            <></>
          ) : (
            <button
              id="loadmore"
              disabled={disabled}
              className="btn-main lead"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
