import React from "react";

const ExploreSkeleton = () => {  
    return (
     <div className="nft__item">
          <div
            style={{
              width: "100%",
              height: "250px",
              background: "#ddd",
              borderRadius: "10px",
            }}
          ></div>

          <div style={{ padding: "12px" }}>
            <div style={{
              width: "70%",
              height: "16px",
              background: "#ddd",
              borderRadius: "4px",
              marginBottom: "8px",
            }}></div>

            <div style={{
              width: "40%",
              height: "14px",
              background: "#ddd",
              borderRadius: "4px",
              marginBottom: "8px",
            }}></div>

            <div style={{
              width: "30%",
              height: "14px",
              background: "#ddd",
              borderRadius: "4px",
            }}></div>
          </div>
          </div>
          )}

    export default ExploreSkeleton;