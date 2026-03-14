import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import HotCollectionsCarousel from "../HCCarousel/HotCollectionsCarousel";

const HotCollections = () => {

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <HotCollectionsCarousel />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
