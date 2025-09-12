import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CountdownTimer from "../GetTimer";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data with artificial timeout
  const fetchData = async (filter = "") => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
          {
            params: { filter },
          }
        );
        setExplore(data);
        setLoading(false);
      }, 1500); // Delay: 1.5 seconds
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setVisibleCount(8);
    fetchData(value);
  };

  const skeletonCount = 8;

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        {loading ? (
          <Skeleton width={200} height={35} borderRadius={5} />
        ) : (
          <select
            id="filter-items"
            value={sortOption}
            onChange={(event) => handleSortChange(event.target.value)}
            style={{ padding: "8px", fontSize: "16px" }}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        )}
      </div>

      {loading
        ? Array(skeletonCount)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item" data-aos="fade-up">
                  <div className="author_list_pp">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>

                  <div className="nft__item_wrap" style={{ marginTop: 15 }}>
                    <Skeleton height={200} width={"100%"} />
                  </div>

                  <div className="nft__item_info" style={{ marginTop: 10 }}>
                    <Skeleton width={"80%"} height={20} style={{ marginBottom: 6 }} />
                    <Skeleton width={"40%"} height={20} />
                  </div>
                </div>
              </div>
            ))
        : explore.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item" data-aos="fade-up">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
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
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#">
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

      {visibleCount < explore.length && !loading && (
        <div className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;