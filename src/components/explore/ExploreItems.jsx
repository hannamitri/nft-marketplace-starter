import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItemCard from "../home/NewItemCard";
import NewItemsSkeleton from "../home/NewItemsSkeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        {
          params: filter ? { filter } : {},
        },
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Unable to load explore items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);
  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setVisibleItems(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <NewItemsSkeleton />
      ) : (
        items.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NewItemCard item={item} />
          </div>
        ))
      )}
      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems((current) => current + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
