import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider2 from "./Slider-new-items.jsx";

const NewItems = () => {
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="small-border bg-color-2"></div>
          </div>
        </div>
        <Slider2 />
      </div>
    </section>
  );
};

export default NewItems;
