import React from "react";
import Skeleton from "../home/Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width="100%" height="300px" borderRadius="10px" />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width="70%" height="30px" borderRadius="5px" />
                  <div className="item_info_counts" style={{ display: "flex", marginTop: "15px", gap: "20px" }}>
                    <Skeleton width="60px" height="20px" borderRadius="5px" />
                    <Skeleton width="60px" height="20px" borderRadius="5px" />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <Skeleton width="100%" height="15px" borderRadius="5px" />
                    <Skeleton width="90%" height="15px" borderRadius="5px" style={{ marginTop: "10px" }} />
                    <Skeleton width="95%" height="15px" borderRadius="5px" style={{ marginTop: "10px" }} />
                    <Skeleton width="80%" height="15px" borderRadius="5px" style={{ marginTop: "10px" }} />
                  </div>
                  <div className="d-flex flex-row" style={{ marginTop: "30px", gap: "40px" }}>
                    <div>
                      <h6>Owner</h6>
                      <div className="item_author" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Skeleton width="60px" height="60px" borderRadius="50%" />
                        <Skeleton width="100px" height="20px" borderRadius="5px" />
                      </div>
                    </div>
                    <div>
                      <h6>Creator</h6>
                      <div className="item_author" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Skeleton width="60px" height="60px" borderRadius="50%" />
                        <Skeleton width="100px" height="20px" borderRadius="5px" />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <h6>Price</h6>
                    <div className="nft-item-price" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Skeleton width="30px" height="30px" borderRadius="5px" />
                      <Skeleton width="80px" height="20px" borderRadius="5px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
