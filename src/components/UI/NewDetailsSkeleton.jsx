import React from "react";

const NewDetailsSkeleton = () => {
  return (
    <>
      <div className="col-md-6 text-center">
        <div
          style={{
            width: "100%",
            height: "636px",
            background: "#ddd",
            borderRadius: "10px",
          }}
        ></div>
      </div>

      <div className="col-md-6">
        <div className="item_info">
          <div
            style={{
              width: "300px",
              height: "36px",
              background: "#ddd",
              borderRadius: "6px",
              marginBottom: "24px",
            }}
          ></div>

          <div
            style={{
              width: "170px",
              height: "30px",
              background: "#ddd",
              borderRadius: "6px",
              marginBottom: "28px",
            }}
          ></div>

          <div
            style={{
              width: "180px",
              height: "30px",
              background: "#ddd",
              borderRadius: "6px",
              marginBottom: "28px",
            }}
          ></div>

          <div
            style={{
              width: "180px",
              height: "50px",
              background: "#ddd",
              borderRadius: "6px",
              marginBottom: "24px",
            }}
          ></div>

          <div
            style={{
              width: "180px",
              height: "50px",
              background: "#ddd",
              borderRadius: "6px",
              marginBottom: "24px",
            }}
          ></div>

          <div
            style={{
              width: "120px",
              height: "40px",
              background: "#ddd",
              borderRadius: "6px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default NewDetailsSkeleton;