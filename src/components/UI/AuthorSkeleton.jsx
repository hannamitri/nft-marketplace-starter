import { Skeleton } from "@mui/material";
import React from "react";

const AuthorSkeleton = () => {
  return (
    <div>
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <Skeleton width={"70px"} height={"70px"} />

              <div className="profile_name">
                <h4>
                  <Skeleton width={"200px"} height={"40px"} />
                  <span className="profile_username">
                    <Skeleton width={"70px"} />
                  </span>
                  <span id="wallet" className="profile_wallet">
                    <Skeleton />
                  </span>

                  <Skeleton />
                </h4>
              </div>

              <i className="fa fa-check"></i>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower">
                <Skeleton width={"150px"} height={"50px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;
