import React from "react";
import { Link } from "react-router-dom";
import { imageWrapperStyle, imageStyle } from "./sliderConfig";

const SliderImageWrapper = ({ item, imageUrl, linkTo, state }) => {
  return (
    <div className="nft_wrap" style={imageWrapperStyle}>
      <Link to={linkTo} state={state} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={imageUrl} className="lazy img-fluid" alt="" style={imageStyle} />
      </Link>
    </div>
  );
};

export default SliderImageWrapper;
