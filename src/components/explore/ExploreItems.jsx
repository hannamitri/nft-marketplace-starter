import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton.jsx";
import ItemTile from "../UI/ItemTile.jsx";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
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
  }, []);

  return (
    <>
      <div>
        <select id='filter-items' defaultValue=''>
          <option value=''>Default</option>
          <option value='price_low_to_high'>Price, Low to High</option>
          <option value='price_high_to_low'>Price, High to Low</option>
          <option value='likes_high_to_low'>Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div key={index} style={{ padding: "0 10px", maxWidth: "25%" }}>
              <div className='nft__item'>
                <Skeleton width='50px' height='50px' borderRadius='50%' />
                <Skeleton width='100%' height='200px' />
                <Skeleton
                  width='100%'
                  height='25px'
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                />
                <Skeleton width='80%' height='15px' />
                <Skeleton width='20px' height='20px' />
              </div>
            </div>
          ))
        : exploreItems.slice(0, 8).map((item) => (
          <ItemTile expiryDate={item.expiryDate} nftImage={item.nftImage} authorImage={item.authorImage} id={item.id} price={item.price} title={item.title} likes={item.likes} />
          ))}
      <div className='col-md-12 text-center'>
        <Link to='' id='loadmore' className='btn-main lead'>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;

