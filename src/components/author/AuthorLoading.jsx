import React from "react";
import AuthorItemsLoading from "./AuthorItemsLoading";

function AuthorLoading() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <div
                className="skeleton-box"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              ></div>

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  <div
                    className="skeleton-box"
                    style={{
                      width: "200px",
                    }}
                  ></div>
                  <span className="profile_username">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "100px",
                      }}
                    ></div>
                  </span>
                  <span id="wallet" className="profile_wallet">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "200px",
                      }}
                    ></div>
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower"></div>
              <div
                className="skeleton-box"
                style={{
                  width: "150px",
                  height: "40px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="de_tab tab_simple">
          <AuthorItemsLoading/>
        </div>
      </div>
    </div>
  );
}

export default AuthorLoading;
