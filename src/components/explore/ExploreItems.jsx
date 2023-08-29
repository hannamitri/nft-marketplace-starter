import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NftItem } from "../UI/NftItem";
import Skeleton from "react-loading-skeleton";

const ExploreItems = () => {
  const [exploreItemsData, setExploreItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(8);

  async function fetchExploreItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreItemsData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchExploreItems();
  }, [loading]);

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 4);
  };

  async function filterItems(filter) {
    if (filter === "price_low_to_high") {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`
      );
      setExploreItemsData(response.data);
    } else if (filter === "price_high_to_low") {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`
      );
      setExploreItemsData(response.data);
    } else if (filter === "likes_high_to_low") {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
      );
      setExploreItemsData(response.data);
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
      {loading && (
        <>
          {Array.from({ length: itemsToShow }).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_col">
                <div className="nft_col_pp">
                  <Skeleton width={50} height={50} borderRadius={99} />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_wrap">
                  <Skeleton width={300} height={441} />
                </div>
                <div className="nft_col_info">
                  <h4>
                    <Skeleton width="40%" height={20} />
                  </h4>
                  <span>
                    <Skeleton height={20} width="20%" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {exploreItemsData.slice(0, itemsToShow).map((nft) => (
        <div
          key={nft.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NftItem nft={nft} />
        </div>
      ))}
      {exploreItemsData.length > itemsToShow && (
        <div className="col-md-12 text-center">
          <Link
            onClick={handleLoadMore}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
