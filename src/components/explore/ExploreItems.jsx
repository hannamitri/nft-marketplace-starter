import React, { useEffect, useState } from "react" 
import { Link } from "react-router-dom";
import nftImage from "../../images/nftImage.jpg";
import NFTCard from "../UI/NFTCard";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const response = await axios.get(url);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  return (
    <>
      <div>
        <select 
        id="filter-items" value={filter}
        onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? new Array(8).fill(0).map((_, index) => (
        <div 
        key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
          <Skeleton width="100%" height="350px" borderRadius="12px" />
        </div>
        </div>
      )) 
      : items.slice(0, visibleItems).map((item, index) => (
        <div 
        key={item.nftId || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NFTCard item ={item} />
        </div>
      ))}

      {!loading && visibleItems < items.length && (
      <div className="col-md-12 text-center">
        <Link 
        to="" 
        id="loadmore" 
        className="btn-main lead"
        onClick={handleLoadMore}
        >
            Load More
        </Link>
      </div>
    )}
    </>
  );
};

export default ExploreItems;