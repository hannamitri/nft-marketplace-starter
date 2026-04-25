import React from "react";

const ItemDetailsSkeleton = () => {
  return (
    <section aria-label="section" className="mt90 sm-mt-0 item-details-skeleton-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <span
              className="nft-skeleton__shimmer item-details-skeleton__hero d-inline-block"
              aria-busy="true"
              aria-label="Loading artwork"
            />
          </div>
          <div className="col-md-6">
            <div className="item_info item-details-skeleton">
              <span className="nft-skeleton__shimmer item-details-skeleton__title d-block" />
              <div className="item_info_counts d-flex flex-row mt-3">
                <span className="nft-skeleton__shimmer item-details-skeleton__pill d-inline-block mr40" />
                <span className="nft-skeleton__shimmer item-details-skeleton__pill d-inline-block" />
              </div>
              <span className="nft-skeleton__shimmer item-details-skeleton__line item-details-skeleton__line--lg d-block mt-4" />
              <span className="nft-skeleton__shimmer item-details-skeleton__line d-block mt-2" />
              <span className="nft-skeleton__shimmer item-details-skeleton__line d-block mt-2" />
              <span className="nft-skeleton__shimmer item-details-skeleton__line item-details-skeleton__line--sm d-block mt-2" />
              <div className="d-flex flex-row mt-4">
                <div className="mr40">
                  <span className="nft-skeleton__shimmer item-details-skeleton__label d-block mb-2" />
                  <div className="d-flex flex-row align-items-center">
                    <span className="nft-skeleton__shimmer item-details-skeleton__owner-avatar d-inline-block mr10" />
                    <span className="nft-skeleton__shimmer item-details-skeleton__owner-name d-inline-block" />
                  </div>
                </div>
              </div>
              <div className="spacer-20"></div>
              <span className="nft-skeleton__shimmer item-details-skeleton__label d-block mb-2" />
              <div className="d-flex flex-row align-items-center">
                <span className="nft-skeleton__shimmer item-details-skeleton__owner-avatar d-inline-block mr10" />
                <span className="nft-skeleton__shimmer item-details-skeleton__owner-name d-inline-block" />
              </div>
              <div className="spacer-40"></div>
              <span className="nft-skeleton__shimmer item-details-skeleton__label d-block mb-2" />
              <span className="nft-skeleton__shimmer item-details-skeleton__price d-inline-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsSkeleton;
