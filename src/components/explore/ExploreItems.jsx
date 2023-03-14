import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../Countdown";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);

  const getExplore = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExplore(response.data);
  };

  async function filterItems(filter) {
    setSkeletonLoading(false);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
    );
    setExplore(response.data);
    setSkeletonLoading(true);
  }

  useEffect(() => {
    getExplore();
  }, []);
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
      {explore.length && skeletonLoading ? (
        explore.slice(0, itemCount).map((item, index) => (
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
                  <img className="lazy" src={item.AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

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
                  <h4>Pinky Ocean</h4>
                </Link>
                <div className="nft__item_price">1.74 ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>69</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton />
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
