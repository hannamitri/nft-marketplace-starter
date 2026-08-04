import React from "react";
import Skeleton from "./Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Image */}
              <div className="col-md-6 text-center">
                <Skeleton className="skeleton-detail-image" />
              </div>

              {/* Right Side */}
              <div className="col-md-6">
                {/* Title */}
                <Skeleton className="skeleton-detail-title" />

                {/* Views / Likes */}
                <div className="d-flex mb-4">
                  <Skeleton className="skeleton-pill me-2" />
                  <Skeleton className="skeleton-pill" />
                </div>

                {/* Description */}
                <Skeleton className="skeleton-detail-line" />
                <Skeleton className="skeleton-detail-line" />
                <Skeleton className="skeleton-detail-line short" />

                {/* Owner */}
                <h6>Owner</h6>

                <div className="item_author mb-4">
                  <Skeleton className="skeleton-avatar" />

                  <div className="author_list_info ms-3">
                    <Skeleton className="skeleton-name" />
                  </div>
                </div>

                {/* Creator */}

                <h6>Creator</h6>

                <div className="item_author mb-4">
                  <Skeleton className="skeleton-avatar" />

                  <div className="author_list_info ms-3">
                    <Skeleton className="skeleton-name" />
                  </div>
                </div>

                {/* Price */}

                <h6>Price</h6>

                <Skeleton className="skeleton-price" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
