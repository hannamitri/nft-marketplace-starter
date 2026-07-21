import React from "react";

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
                <div className="skeleton-box skeleton-detail-image"></div>
              </div>

              {/* Right Side */}
              <div className="col-md-6">

                {/* Title */}
                <div className="skeleton-box skeleton-detail-title"></div>

                {/* Views / Likes */}
                <div className="d-flex mb-4">
                  <div className="skeleton-box skeleton-pill me-2"></div>
                  <div className="skeleton-box skeleton-pill"></div>
                </div>

                {/* Description */}
                <div className="skeleton-box skeleton-detail-line"></div>
                <div className="skeleton-box skeleton-detail-line"></div>
                <div className="skeleton-box skeleton-detail-line short"></div>

                {/* Owner */}
                <h6>Owner</h6>

                <div className="item_author mb-4">

                  <div className="skeleton-box skeleton-avatar"></div>

                  <div className="author_list_info ms-3">
                    <div className="skeleton-box skeleton-name"></div>
                  </div>

                </div>

                {/* Creator */}

                <h6>Creator</h6>

                <div className="item_author mb-4">

                  <div className="skeleton-box skeleton-avatar"></div>

                  <div className="author_list_info ms-3">
                    <div className="skeleton-box skeleton-name"></div>
                  </div>

                </div>

                {/* Price */}

                <h6>Price</h6>

                <div className="skeleton-box skeleton-price"></div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;