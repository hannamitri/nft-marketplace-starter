import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItem from "../UI/NewItem";
import Skeleton from "../UI/Skeleton";

function ExploreItems() {
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const [exploreItemsData, setExploreItemsData] = useState();
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filterUrl, setFilterUrl] = useState(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter="
  );

  const loadMoreItems = () => {
    setVisibleItems((prevValue) => prevValue + 4);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilterUrl(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
    );
  };

  const getExploreItemsData = async (URL) => {
    try {
      setLoading(true);
      await axios.get(URL).then(({ data }) => {
        setExploreItemsData(data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getExploreItemsData(url);
  }, []);

  useEffect(() => {
    if (filterUrl) {
      getExploreItemsData(filterUrl);
    }
  }, [filterUrl]);

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
      {loading ? (
        new Array(8).fill().map((_, idx) => (
          <div
            key={idx}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}>
            <Skeleton width="100%" height="400px" />
          </div>
        ))
      ) : (
        <>
          {exploreItemsData
            ?.slice(0, visibleItems)
            .map((exploreItemsData, id) => (
              <div
                key={id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}>
                <NewItem data={exploreItemsData} key={id} loading={loading} />
              </div>
            ))}
          {visibleItems >= exploreItemsData?.length ? null : (
            <div className="col-md-12 text-center">
              <Link
                to=""
                id="loadmore"
                className="btn-main lead"
                onClick={loadMoreItems}>
                Load more
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ExploreItems;
