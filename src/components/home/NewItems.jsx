import React from "react";
import NftItemCard from "../common/NftItemCard";
import NftItemCardSkeleton from "../common/NftItemCardSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";

const HOME_NEW_ITEMS_COUNT = 4;

const NewItems = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();
  const items = uniqueItems.slice(0, HOME_NEW_ITEMS_COUNT);

  return (
    <section
      id="section-items"
      className="no-bottom"
      data-aos="fade-up"
      data-aos-easing="ease-out"
      data-aos-duration="800"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            new Array(HOME_NEW_ITEMS_COUNT)
              .fill(0)
              .map((_, index) => <NftItemCardSkeleton key={`new-${index}`} />)}
          {error && (
            <div className="col-md-12 text-center">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            items.map((item, index) => (
              <NftItemCard key={item.id ?? item.nftId ?? index} item={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
