import React from "react";
import { sliderButtonStyle } from "./sliderConfig";

const SliderButton = ({ direction, onClick }) => {
  const position = direction === "prev" ? { left: "-10px" } : { right: "-10px" };
  const icon = direction === "prev" ? "fa fa-chevron-left" : "fa fa-chevron-right";

  return (
    <button onClick={onClick} style={{ ...sliderButtonStyle, ...position }}>
      <i className={icon}></i>
    </button>
  );
};

export default SliderButton;
