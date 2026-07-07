import React from "react";

const ItemDetailsSkeleton = () => {
  return (
    <section
      aria-label="section"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-easing="ease-out"
    >
      <div className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <div className="skeleton-image skeleton-shimmer item-details-skeleton-image"></div>
          </div>
          <div className="col-md-6">
            <div className="skeleton-title skeleton-shimmer"></div>
            <div className="skeleton-row skeleton-shimmer"></div>
            <div className="skeleton-row skeleton-shimmer"></div>
            <div className="skeleton-row skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsSkeleton;
