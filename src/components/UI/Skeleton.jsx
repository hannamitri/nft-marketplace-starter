import React from "react";
import "./Skeleton.css";

const SKELETON_TYPES = {
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  title: {
    width: "70%",
    height: "16px",
    borderRadius: "4px"
  },
  subtitle: {
    width: "40%", 
    height: "12px",
    borderRadius: "4px"
  },
  image: {
    width: "100%",
    height: "200px",
    borderRadius: "4px"
  },
  text: {
    width: "100%",
    height: "12px",
    borderRadius: "4px"
  },
  button: {
    width: "100px",
    height: "36px",
    borderRadius: "4px"
  },
  price: {
    width: "60%",
    height: "14px",
    borderRadius: "4px"
  },
  timer: {
    width: "100px",
    height: "20px",
    borderRadius: "4px"
  }
};

const Skeleton = ({
  type,
  width,
  height,
  borderRadius = "4px",
  className = "",
  animate = true,
  style = {},
}) => {

  let finalProps = { borderRadius, style: { ...style } };
  
  if (type && SKELETON_TYPES[type]) {
    const typePreset = SKELETON_TYPES[type];
    finalProps = {
      ...finalProps,
      width: width || typePreset.width,
      height: height || typePreset.height,
      borderRadius: borderRadius || typePreset.borderRadius
    };
  } else {
    finalProps = {
      ...finalProps,
      width,
      height
    };
  }

  const classes = `skeleton-box${animate ? " skeleton-animate" : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <div
      className={classes}
      style={{
        width: finalProps.width,
        height: finalProps.height,
        borderRadius: finalProps.borderRadius,
        ...finalProps.style,
      }}
    ></div>
  );
};

export default Skeleton;
