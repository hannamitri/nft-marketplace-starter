import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NFTCard from "../UI/NFTCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setExploreItems(response.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchItems = (filter = "") => {
    setIsLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          filter ? `?filter=${filter}` : ""
        }`
      )
      .then((response) => {
        setExploreItems(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    fetchItems(filterValue);
  };

  const renderSkeleton = () => <Skeleton type="Items" />;
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
      {isLoading
        ? Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                {renderSkeleton()}
              </div>
            ))
        : exploreItems.slice(0, itemCount).map((items, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTCard item={items} />
            </div>
          ))}
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
