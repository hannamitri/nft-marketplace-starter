import React from "react";
import Skeleton from "../UI/Skeleton";

const TopSellersSkeleton = () => {
  return (
    <>
      {new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <Skeleton
              width="50px"
              height="50px"
              borderRadius="50%"
            />
          </div>

          <div className="author_list_info">
            <Skeleton
              width="120px"
              height="18px"
              borderRadius="5px"
            />

            <div style={{ marginTop: "8px" }}>
              <Skeleton
                width="70px"
                height="14px"
                borderRadius="5px"
              />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default TopSellersSkeleton;