import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div className="container mt90 sm-mt-0">
          <div className="row">
            <div className="col-md-6 text-center">
              <Skeleton height={400} width="100%" borderRadius={10} />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2><Skeleton width={250} /></h2>

                <div className="item_info_counts d-flex gap-3">
                  <Skeleton width={50} />
                  <Skeleton width={50} />
                </div>

                <p><Skeleton count={3} /></p>

                <div className="d-flex flex-row">
                  <div className="mr40">
                    <h6><Skeleton width={60} /></h6>
                    <div className="item_author d-flex align-items-center">
                      <Skeleton circle width={50} height={50} />
                      <div className="ml-2">
                        <Skeleton width={100} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="de_tab tab_simple mt-4">
                  <h6><Skeleton width={60} /></h6>
                  <div className="item_author d-flex align-items-center">
                    <Skeleton circle width={50} height={50} />
                    <div className="ml-2">
                      <Skeleton width={100} />
                    </div>
                  </div>

                  <div className="spacer-40"></div>

                  <h6><Skeleton width={60} /></h6>
                  <Skeleton width={80} height={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
