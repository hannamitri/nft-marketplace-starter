import { useState } from "react";

const Skeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        overflow: "hidden",
      }}
    >
      {!loaded && (
        <div
          className="skeleton skeleton-img"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => console.log("Image failed:", src)} // 👈 add this
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // 👈 important
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};

export default Skeleton;
