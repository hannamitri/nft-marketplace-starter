import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8); // Initially show 8 items

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4); // Load more items each time
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {items.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              {" "}
              <NftCard item={item} />
            </div>
          ))}
        </div>
      )}
      {/* {items.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block" }}
        >
          <NftCard item={item} />
        </div>
      ))} */}
      <div className="col-md-12 text-center">
        {visibleItems < items.length && (
          <button onClick={loadMoreItems} className="btn-main lead"></button>
        )}
        {/* <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link> */}
      </div>
    </>
  );
};

export default ExploreItems;
