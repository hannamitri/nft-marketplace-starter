import React from "react";

const AuthorSkeleton = () => {
  return (
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

        <div
          className="skeleton-box"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            position: "absolute",
            left: "120px",
            bottom: "5px",
          }}
        ></div>

        <div className="profile_name">
          <h4>
            <div
              className="skeleton-box"
              style={{
                width: "140px",
                height: "24px",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            ></div>

            <span className="profile_username">
              <div
                className="skeleton-box"
                style={{
                  width: "90px",
                  height: "16px",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              ></div>
            </span>

            <span className="profile_wallet">
              <div
                className="skeleton-box"
                style={{
                  width: "220px",
                  height: "16px",
                  borderRadius: "4px",
                }}
              ></div>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;