import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import HotCollectionsSkeleton from "./hot-collections/HotCollectionSkeleton";
import HotCollection from "./hot-collections/HotCollection";

const HotCollections = ({ sliderSettings }) => {
  const [hotCol, setHotCol] = useState([]);
  const [loading, setLoading] = useState(false);
  

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCol(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

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
          <Slider {...sliderSettings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <HotCollectionsSkeleton key={index} />
                ))
              : hotCol.map((collection) => (
                  <HotCollection key={collection.id} collection={collection}/>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
