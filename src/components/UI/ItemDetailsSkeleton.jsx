import React from "react";
import Skeleton from "./Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* LEFT NFT IMAGE */}
              <div className="col-md-6 text-center">
                <Skeleton width="100%" height="450px" borderRadius="12px" />
              </div>

              {/* RIGHT CONTENT */}
              <div className="col-md-6">

                {/* TITLE */}
                <Skeleton width="60%" height="32px" borderRadius="6px" />

                <div style={{ marginTop: "16px" }}>
                  <Skeleton width="40%" height="20px" borderRadius="6px" />
                </div>

                {/* DESCRIPTION */}
                <div style={{ marginTop: "20px" }}>
                  <Skeleton width="100%" height="12px" borderRadius="6px" />
                  <Skeleton width="95%" height="12px" borderRadius="6px" />
                  <Skeleton width="80%" height="12px" borderRadius="6px" />
                </div>

                {/* OWNER */}
                <div style={{ marginTop: "30px" }}>
                  <Skeleton width="80px" height="14px" borderRadius="6px" />

                  <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <div style={{ marginLeft: "12px" }}>
                      <Skeleton width="120px" height="16px" borderRadius="6px" />
                    </div>
                  </div>
                </div>

                {/* CREATOR */}
                <div style={{ marginTop: "30px" }}>
                  <Skeleton width="80px" height="14px" borderRadius="6px" />

                  <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <div style={{ marginLeft: "12px" }}>
                      <Skeleton width="120px" height="16px" borderRadius="6px" />
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div style={{ marginTop: "30px" }}>
                  <Skeleton width="80px" height="14px" borderRadius="6px" />
                  <div style={{ marginTop: "10px" }}>
                    <Skeleton width="100px" height="28px" borderRadius="6px" />
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