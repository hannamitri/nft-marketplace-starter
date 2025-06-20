import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";
import NftItem from "../NftItem";
import useSWR from "swr";
import NftSkeleton from "../NftSkeleton";

const DEFAULT_LIMIT = 8;

const ExploreItems = () => {
  useInterval();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [filter, setFilter] = useState("");
  const { data: items = [], isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"+(filter && `?filter=${filter}`)
  );

  function onSelectChange(e) {
    setFilter(e.target.value);
    setLimit(DEFAULT_LIMIT);
  }

  return (
    <>
      <div>
        <select onChange={onSelectChange} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading &&
        Array(12)
          .fill()
          .map((_, i) => (
            <NftSkeleton
              key={i}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            />
          ))}
      {!isLoading &&
        items.slice(0, limit).map((item) => (
          <NftItem
            key={item.id}
            nft={item}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          />
        ))}
      {(!isLoading && limit < items.length) && (
        <div className="col-md-12 text-center">
          <button onClick={() => setLimit(limit+4)} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
