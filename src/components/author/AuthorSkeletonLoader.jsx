import React from "react";

const skeletonStyle = {
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  marginBottom: "10px",
  animation: "pulse 1.5s infinite ease-in-out",
};

const circleStyle = {
  ...skeletonStyle,
  borderRadius: "50%",
};

const AuthorSkeletonLoader = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Banner Skeleton */}
      <div
        style={{
          ...skeletonStyle,
          width: "100%",
          height: "200px",
          marginBottom: "30px",
        }}
      ></div>

      {/* Profile Section Skeleton */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        {/* Avatar Skeleton */}
        <div style={{ ...circleStyle, width: "100px", height: "100px", marginRight: "20px" }}></div>
        

        {/* Text Skeletons */}
        <div style={{ flex: 1 }}>
          <div style={{ ...skeletonStyle, width: "20%", height: "20px", marginBottom: "10px" }}></div>
          <div style={{ ...skeletonStyle, width: "10%", height: "15px", marginBottom: "10px" }}></div>
          <div style={{ ...skeletonStyle, width: "30%", height: "15px" }}></div>
        </div>

         {/* Followers and Follow Button Skeleton */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
        <div style={{ ...skeletonStyle, width: "100px", height: "45px", borderRadius: "10px" }}></div>
      </div>
      </div>

     

      {/* Collections Skeleton Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            style={{
              ...skeletonStyle,
              width: "calc(25% - 15px)",
              height: "250px",
              borderRadius: "10px",
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthorSkeletonLoader;
