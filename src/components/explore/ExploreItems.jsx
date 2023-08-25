import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../home/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreNFTs, setExploreNFTs] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [loading, setLoading] = useState();

  async function fetchExploreNFTs() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreNFTs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchExploreNFTs();
  }, []);

  function loadMore() {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 1);
  }

  const totalItems = visibleRows * 4;

  async function filterItems(filter) {
    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setExploreNFTs(data);
    } else if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setExploreNFTs(data);
    } else if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setExploreNFTs(data);
    }
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreNFTs.slice(0, visibleRows * 4).length > 0 && !loading
        ? exploreNFTs.slice(0, visibleRows * 4).map((exploreNFT, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${exploreNFT.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={exploreNFT.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown info={exploreNFT}></Countdown>
                <div className="nft__item_wrap">
                  {/* <div className="nft__item_extra">
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
                  </div> */}
                  <Link to={`/item-details/${exploreNFT.id}`}>
                    <img
                      src={exploreNFT.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${exploreNFT.id}`}>
                    <h4>{exploreNFT.title}</h4>
                  </Link>
                  <div className="nft__item_price">{exploreNFT.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreNFT.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  {/* <Skeleton width={60} height={60} borderRadius={9999} /> */}
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="100%" borderRadius={5} />
                </div>
                <div className="nft__item_info" style={{ marginTop: "15px" }}>
                  <div className="nft__item_price">
                    <Skeleton width="40%" height={20} borderRadius={5} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      {exploreNFTs.length > totalItems && (
        <div className="col-md-12 text-center" onClick={loadMore}>
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
