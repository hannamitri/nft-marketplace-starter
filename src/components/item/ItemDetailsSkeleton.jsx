import React from "react";
import "../common/nft-card-skeleton.css";
import "./item-details-skeleton.css";

const ItemDetailsSkeleton = () => {
  return (
    <section
      aria-label="section"
      className="mt90 sm-mt-0 item-details-skeleton"
      aria-hidden="true"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <span className="nft-card-skeleton__pulse item-details-skeleton__hero" />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <span className="nft-card-skeleton__pulse item-details-skeleton__title" />
              <div className="item_info_counts item-details-skeleton__counts">
                <span className="nft-card-skeleton__pulse item-details-skeleton__pill" />
                <span className="nft-card-skeleton__pulse item-details-skeleton__pill" />
              </div>
              <span className="nft-card-skeleton__pulse item-details-skeleton__line" />
              <span className="nft-card-skeleton__pulse item-details-skeleton__line item-details-skeleton__line--mid" />
              <span className="nft-card-skeleton__pulse item-details-skeleton__line item-details-skeleton__line--short" />
              <div className="d-flex flex-row item-details-skeleton__authors">
                <div className="mr40 item-details-skeleton__author-block">
                  <span className="nft-card-skeleton__pulse item-details-skeleton__label" />
                  <div className="item_author">
                    <span className="nft-card-skeleton__pulse item-details-skeleton__avatar" />
                    <span className="nft-card-skeleton__pulse item-details-skeleton__name" />
                  </div>
                </div>
                <div className="item-details-skeleton__author-block">
                  <span className="nft-card-skeleton__pulse item-details-skeleton__label" />
                  <div className="item_author">
                    <span className="nft-card-skeleton__pulse item-details-skeleton__avatar" />
                    <span className="nft-card-skeleton__pulse item-details-skeleton__name" />
                  </div>
                </div>
              </div>
              <div className="de_tab tab_simple item-details-skeleton__price-block">
                <span className="nft-card-skeleton__pulse item-details-skeleton__label" />
                <span className="nft-card-skeleton__pulse item-details-skeleton__price" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsSkeleton;
