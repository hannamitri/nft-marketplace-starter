import React, { useMemo } from "react";
import NftItemCard from "../common/NftItemCard";
import NftItemCardSkeleton from "../common/NftItemCardSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";

const HOME_NEW_ITEMS_COUNT = 4;

const homeColumnClass = "col-lg-3 col-md-6 col-sm-6 col-xs-12";

const NewItems = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();

  const homeItems = useMemo(
    () => uniqueItems.slice(0, HOME_NEW_ITEMS_COUNT),
    [uniqueItems]
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            Array.from({ length: HOME_NEW_ITEMS_COUNT }, (_, index) => (
              <NftItemCardSkeleton
                key={`new-items-skeleton-${index}`}
                columnClassName={homeColumnClass}
              />
            ))}
          {error && (
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            homeItems.map((item) => (
              <NftItemCard
                key={item.id ?? item.nftId}
                item={item}
                columnClassName={homeColumnClass}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;