import React from "react";
import Skeleton from "../UI/Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div className="container mt90">
      <div className="row">
        <div className="col-md-6">
          <Skeleton
            width="100%"
            height="500px"
            borderRadius="10px"
          />
        </div>

        <div className="col-md-6">
          <Skeleton
            width="70%"
            height="35px"
            borderRadius="5px"
          />

          <div style={{ marginTop: "25px" }}>
            <Skeleton
              width="40%"
              height="20px"
              borderRadius="5px"
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <Skeleton
              width="100%"
              height="80px"
              borderRadius="5px"
            />
          </div>

          <div style={{ marginTop: "35px" }}>
            <Skeleton
              width="50%"
              height="50px"
              borderRadius="25px"
            />
          </div>

          <div style={{ marginTop: "35px" }}>
            <Skeleton
              width="30%"
              height="25px"
              borderRadius="5px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;