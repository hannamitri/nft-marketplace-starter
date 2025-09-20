import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../home/Countdown";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {
  const [data, setData] = React.useState([]);
  const [visibleCount, setVisibleCount] = React.useState(8);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");

  
  

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setData(data);
      setLoading(false);
    }
    getData();
  }, []);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => Math.min(prev + 4, data.length));
  };

  // Filtering logic
  let filteredData = [...data];
  if (filter === "price_low_to_high") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (filter === "price_high_to_low") {
    filteredData.sort((a, b) => b.price - a.price);
  } else if (filter === "likes_high_to_low") {
    filteredData.sort((a, b) => b.likes - a.likes);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={e => setFilter(e.target.value)}
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
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width={50} height={50} borderRadius={100} />
              </div>
              <div className="de_countdown">
                <Skeleton width={100} height={20} borderRadius={5} />
              </div>{" "}
              <div className="nft__item_wrap">
                <Skeleton width={200} height={200} borderRadius={10} />
              </div>
              <div className="nft__item_info">
                <Skeleton
                  width={"60%"}
                  height={20}
                  borderRadius={5}
                  style={{ marginBottom: "10px" }}
                />
                <Skeleton
                  width={"40%"}
                  height={20}
                  borderRadius={5}
                  style={{ marginBottom: "10px" }}
                />
              </div>
            </div>
          </div>
        ))}
      {!loading &&
        filteredData.slice(0, visibleCount).map((elem, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${elem.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img
                    className="lazy"
                    src={elem.authorImage || <Skeleton count={1} />}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">
                <Countdown expiryDate={elem.expiryDate} />
              </div>{" "}
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
                <Link to={`/item-details/${elem.nftId}`}>
                  <img
                    src={elem.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${elem.nftId}`}>
                  <h4>{elem.nftName}</h4>
                </Link>
                <div className="nft__item_price">{elem.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{elem.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {visibleCount < data.length && (
        <div className="col-md-12 text-center">
          <a
            href="#"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </a>
        </div>
      )}
    </>
  );
};
export default ExploreItems;
