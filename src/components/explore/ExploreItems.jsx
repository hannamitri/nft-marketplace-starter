import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getExploreItemsFilter } from "../../api/exploreItems";

import NftCard from "../UI/NftCard";
import Aos from "aos";
import "aos/dist/aos.css";


const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slice, setSlice] = useState(8);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    function addSlice() {
      if (slice >= items.length) {
        slice = items.length;
      } else {
        let newSlice = 4;
        setSlice(slice + newSlice);
        newSlice = newSlice + 4;
      }
    }
    document.getElementById("loadmore").addEventListener("click", addSlice);
  }, [slice, items]);

  useEffect(() => {
    async function fetchData() {
      const items = await getExploreItemsFilter(filter);
      setTimeout(() => {
      setLoading(false);
    }
    , 500);
      setItems(items);
    }
   
    fetchData();
  }, [filter]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.slice(0, slice).map((item) => (
        <div
          data-aos='fade-in'
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NftCard item={item} loading={loading} />
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
