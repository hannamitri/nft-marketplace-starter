import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown";

const ExploreItems = () => {
  const [itemCount, setItemCount] = useState(8);
  const [exploreItems, setExploreItems] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const getExploreData = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreItems(data);
  };

  async function filterItems(filter) {
    setSkeletonLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(data);
    setSkeletonLoading(true);
  }

  useEffect(() => {
    getExploreData();
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
      {exploreItems.length && skeletonLoading ? (
        exploreItems.slice(0, itemCount).map((item, index) => (
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
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <CountDown expiryDate={item.expiryDate} />}

              <div className="nft__item_wrap">
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
                <div className="nft__item_price">
                  {item.price} ETH<span>{item.date}</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        {itemCount !== 16 && (
          <Link
            onClick={() => setItemCount(itemCount + 4)}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
