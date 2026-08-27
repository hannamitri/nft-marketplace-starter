import React from "react";

const SliderArrow = ({
  className,
  style,
  onClick,
  label,
}) => {
  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#8364e2",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
      aria-label={label}
    />
  );
};

export default SliderArrow;