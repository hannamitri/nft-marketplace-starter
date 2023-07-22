import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import ExploreNewItem from "../UI/exploreNewItem";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [slice, setSlice] = useState(8)
  const [filterValue, setFilterValue] = useState('')

  const getExploreItems = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
    );
    setExploreItems(response.data);
  }; 

  useEffect(() => {
    setExploreItems([])
    getExploreItems();
  }, [filterValue]);

  return (
    <>
      <div>
        <select onChange={(event) => setFilterValue(event.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems?.length ? (
        <>
          {exploreItems?.slice(0, slice).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ExploreNewItem item={item} />
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="400px" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}

     {slice !== 16 && <div onClick={() => setSlice(slice + 4)} className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>}
    </>
  );
};

export default ExploreItems;
