import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  async function fetchExploreItems() {
    setLoading(true);

    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          filter ? `?filter=${filter}` : ""
        }`,
      );

      const data = await response.json();
      console.log(data[0]);

      setExploreData(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchExploreItems();
  }, [filter]);
  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleItems(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          >
            <div className="nft__item">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#2a2a2a",
                  marginBottom: "20px",
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#2a2a2a",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              ></div>

              <div
                style={{
                  width: "70%",
                  height: "20px",
                  background: "#2a2a2a",
                  borderRadius: "6px",
                  marginBottom: "12px",
                }}
              ></div>

              <div
                style={{
                  width: "40%",
                  height: "20px",
                  background: "#2a2a2a",
                  borderRadius: "6px",
                }}
              ></div>
            </div>
          </div>
        ))}
      {!loading &&
        exploreData.slice(0, visibleItems).map((item) => (
          <div
            key={item.nftId}
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
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <CountdownTimer expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>

                    <div className="nft__item_share">
                      <h4>Share</h4>

                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>

                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>

                      <a href="/">
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
      {visibleItems < exploreData.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems((prev) => prev + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
