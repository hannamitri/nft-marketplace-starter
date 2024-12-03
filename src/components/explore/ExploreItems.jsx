import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import CountdownTimer from "../UI/CountdownTimer";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  async function fetchData(filter = "") {
    try {
      let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await axios.get(url);
      setExploreItems(response.data);
    } catch (error) {
      console.error("Failed fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems([...exploreItems, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton height={400} width={"100%"} />
          </div>
        ))
      ) : (
        exploreItems.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                  <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && (
                <div className="de_countdown">
                  <CountdownTimer expiryDate={item.expiryDate} />
                </div>
              )}
              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt="" />
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
        ))
      )}
      <div className="col-md-12 text-center">
        <button onClick={handleLoadMore} className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
