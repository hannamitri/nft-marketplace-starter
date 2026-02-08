import React from "react";
import Skeleton from "../UI/Skeleton.jsx";

const AuthorSkeleton = () => {
  return (
    <div className="col-md-12">
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <Skeleton width="120px" height="120px" borderRadius="50%" />
            <div className="profile_name" style={{ marginTop: "15px" }}>
              <Skeleton width="200px" height="24px" borderRadius="4px" />
              <div style={{ marginTop: "8px" }}>
                <Skeleton width="150px" height="18px" borderRadius="4px" />
              </div>
              <div style={{ marginTop: "8px" }}>
                <Skeleton width="250px" height="18px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <Skeleton width="120px" height="20px" borderRadius="4px" />
            <div style={{ marginTop: "12px" }}>
              <Skeleton width="100px" height="40px" borderRadius="8px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;