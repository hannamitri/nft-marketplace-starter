import React from "react";

const AuthorSkeleton = () => {
  return (
    <div className="de-flex-col">
      <div className="profile_avatar">
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "#ddd",
          }}
        ></div>

        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "#ddd",
            position: "absolute",
            left: "120px",
            bottom: "5px",
          }}
        ></div>

        <div className="profile_name">
          <h4>
            <div
              style={{
                width: "140px",
                height: "24px",
                background: "#ddd",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            ></div>

            <span className="profile_username">
              <div
                style={{
                  width: "90px",
                  height: "16px",
                  background: "#ddd",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              ></div>
            </span>

            <span className="profile_wallet">
              <div
                style={{
                  width: "220px",
                  height: "16px",
                  background: "#ddd",
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