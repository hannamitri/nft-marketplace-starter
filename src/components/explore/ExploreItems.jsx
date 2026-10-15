import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";
import ExploreFilter from "./ExploreFilter";

const PAGE_SIZE = 8;
const LOAD_MORE_SIZE = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    // Ignore responses from an older filter if the user switches quickly.
    let ignore = false;

    async function fetchItems() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
          { params: filter ? { filter } : {} }
        );
        if (!ignore) setItems(data);
      } catch (error) {
        console.error("Failed to fetch explore items:", error);
      }
      if (!ignore) setLoading(false);
    }
    fetchItems();

    return () => {
      ignore = true;
    };
  }, [filter]);

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <ExploreFilter value={filter} onChange={handleFilterChange} />
      {loading
        ? new Array(PAGE_SIZE).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width="100%" height="400px" borderRadius="15px" />
            </div>
          ))
        : items.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount(visibleCount + LOAD_MORE_SIZE)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
