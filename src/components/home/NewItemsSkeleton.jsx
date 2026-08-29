import React from "react";
import Skeleton from "../UI/Skeleton";

const NewItemsSkeleton = () => {
  return (
    <>
      {new Array(4).fill(0).map((_, index) => (
        <div
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={index}
        >
          <div className="nft__item">
            <Skeleton
              width="100%"
              height="230px"
              borderRadius="10px"
            />

            <div style={{ marginTop: "20px" }}>
              <Skeleton
                width="70%"
                height="20px"
                borderRadius="5px"
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <Skeleton
                width="40%"
                height="16px"
                borderRadius="5px"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewItemsSkeleton;