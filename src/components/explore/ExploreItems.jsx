import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../UI/Timer";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loadMore, setLoadMore] = useState(8);
  const [loading, setLoading] = useState();

  async function exploreItemsData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
    setLoading(false);
  }
  async function exploreFilter(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setExploreItems(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    exploreItemsData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 nft__item"
              style={{ display: "block", backgroundSize: "cover" }}
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
                <div className="skeleton-box" style={{ width: "100px" }}></div>
              </div>
              <div
                className="nft__item_price skeleton-box"
                style={{ width: "50px" }}
              ></div>
            </div>
          ))}
        </>
      ) : (
        <div>
          <select id="filter-items" defaultValue="" onChange={(e) => exploreFilter(e.target.value)}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      )}

      {exploreItems
        .slice(0, loadMore)
        .map(
          (
            {
              authorImage,
              nftImage,
              title,
              likes,
              nftId,
              authorId,
              price,
              expiryDate,
            },
            index
          ) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {expiryDate && <Timer expiryDate={expiryDate} />}

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
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setLoadMore(loadMore + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
