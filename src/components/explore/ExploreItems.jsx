import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);
  const [value, setValue] = useState(' ')
  const isButtonVisible = itemCount < 16;


  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`,
      );
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [value]);
  
  function handleFilterChange(event) {
    setValue(event.target.value)
  }

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
      {
        loading
        ?
        (
          new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width='100%' height='400px'/>
            </div>
          ))
        )
        :
        (
          data.slice(0, itemCount).map((item) => (
             <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Card item={item}/>
            </div>
          ))
        )
      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => setItemCount((prev) => prev + 4)} style={{visibility: isButtonVisible ? 'visible' : 'hidden'}}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
