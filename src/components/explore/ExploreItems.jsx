import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import CardSkeleton from "../UI/CardSkeleton";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [numCards, setNumCards] = useState(8);
  const [loading, setLoading] = useState(true);

  async function fetchData(filter) {
    let nftData;
    setLoading(true);
    if (filter) {
      nftData = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
    } else {
      nftData = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
    }
    setData(nftData.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event)=>fetchData(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="card_skel_wrapper">
          {new Array(numCards).fill(0).map((_, index) => {
            return (
              <div className="card_skel" key={index}>
                <CardSkeleton />
              </div>
            );
          })}
        </div>
      ) : (
        data
          .slice(0, numCards)
          .map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              authorImage={item.authorImage}
              expiryDate={item.expiryDate}
              nftImage={item.nftImage}
              title={item.title}
              price={item.price}
              likes={item.likes}
              onExplorePage={true}
              authorId={item.authorId}
              nftId={item.nftId}
            />
          ))
      )}
      {numCards < 16 ? (
        <div
          className="col-md-12 text-center"
          onClick={() => setNumCards(numCards + 4)}
        >
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExploreItems;
