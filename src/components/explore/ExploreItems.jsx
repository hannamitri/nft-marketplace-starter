import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton.jsx";
import ItemTile from "../UI/ItemTile.jsx";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliceAmount, setSliceAmount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const queryParam = filter ? `?filter=${filter}` : "";
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${queryParam}`
        );
        if (response.data) {
          setExploreItems(response.data);
        } else {
          setExploreItems([]);
        }
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]); 

  const handleClick = (e) => {
    e.preventDefault();
    setSliceAmount((prevAmount) => prevAmount + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        <select id="filter-items" onChange={handleFilterChange} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div key={index} style={{ padding: "0 10px", maxWidth: "25%" }}>
              <div className="nft__item">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <Skeleton width="100%" height="200px" />
                <Skeleton
                  width="100%"
                  height="25px"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                />
                <Skeleton width="80%" height="15px" />
                <Skeleton width="20px" height="20px" />
              </div>
            </div>
          ))
        : exploreItems.slice(0, sliceAmount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemTile
                expiryDate={item.expiryDate}
                nftImage={item.nftImage}
                authorImage={item.authorImage}
                id={item.id}
                price={item.price}
                title={item.title}
                likes={item.likes}
                nftId={item.nftId}
                authorId={item.authorId}
              />
            </div>
          ))}

      {sliceAmount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleClick}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
