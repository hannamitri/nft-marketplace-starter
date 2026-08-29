import React from "react";
import Skeleton from "../UI/Skeleton";

const AuthorSkeleton = () => {
  return (
    <div className="container mt90">
      <Skeleton
        width="100%"
        height="220px"
        borderRadius="10px"
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        <Skeleton
          width="120px"
          height="120px"
          borderRadius="50%"
        />

        <div style={{ flex: 1 }}>
          <Skeleton
            width="220px"
            height="30px"
            borderRadius="5px"
          />

          <div style={{ marginTop: "12px" }}>
            <Skeleton
              width="150px"
              height="18px"
              borderRadius="5px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;