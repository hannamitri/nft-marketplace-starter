import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import NewItem from "./new-items/NewItem";
import NewItemSkeleton from "./new-items/NewItemSkeleton";

const NewItems = ({ sliderSettings }) => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {loading ? (new Array(2).fill(0).map((_, index) => <NewItemSkeleton key={index} />)) : (
              newItems.map((item, index) => <NewItem item={item} key={index} />)
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
