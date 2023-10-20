import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Nfts, setNfts] = useState(8);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreData(data);
    setLoading(false);
  }

  async function filterNfts(filter) 
  {

    if (filter === "price_low_to_high")
    {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`)
      setExploreData(data)
    }

    else if (filter === "price_high_to_low")
    {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`)
      setExploreData(data)
    }


    else if (filter === "likes_high_to_low")
    {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`)
      setExploreData(data)
    }
  }

  useEffect(() => {
    fetchData();
    filterNfts()
  }, []);

  function showMoreNft() {
    setNfts((Nfts) => Nfts + 4);
  }

  

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNfts(event.target.value)}
        >
          <option value="" disabled>Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && exploreData.length === 0 ? (
        <NftCardSkeleton />
      ) : (
        exploreData
          .slice(0, Nfts)
          .map((explore) => (
            <div
            key={explore.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
          <NftCard nftInfo={explore} />
          </div>
          ))
      )}
      <div className="col-md-12 text-center" >
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={showMoreNft}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
