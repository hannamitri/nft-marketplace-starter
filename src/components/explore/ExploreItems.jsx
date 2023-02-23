import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExpiryTime from "../explore/ExpiryTime";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreNft, setExploreNft] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(8);

  async function getExploreItems() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreNft(data);
    setLoading(false);
  }

  async function filterNFTItems(filterCategory) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterCategory}`
    );
    setExploreNft(data);
  }

  useState(() => {
    getExploreItems();
  }, []);
  return (
    <>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={320} height={400} borderRadius={1} />
            </div>
          ))}
        </>
      ) : (
        <div>
          <select
            id="filter-items"
            defaultValue=""
            onChange={(e) => filterNFTItems(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      )}
      {exploreNft.slice(0, loader).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${_.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={_.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {_.expiryDate ? <ExpiryTime expiryTime={_.expiryDate} /> : ""}

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
              <Link to={`/item-details/${_.nftId}`}>
                <img
                  src={_.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{_.title}</h4>
              </Link>
              <div className="nft__item_price">{_.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{_.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setLoader(loader + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;