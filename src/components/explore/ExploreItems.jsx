import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../NFTCard";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("likes_high_to_low");

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setNfts(res.data);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className="col-md-12">
        <div className="items_filter">
          <form className="row form-dark" id="form_quick_search" name="form_quick_search">
            <div className="col-md-12 text-center">
              <select
                id="filter-items"
                defaultValue="likes_high_to_low"
                onChange={handleFilterChange}
              >
                <option value="">Default</option>
                <option value="price_low_to_high">Price: Low to High</option>
                <option value="price_high_to_low">Price: High to Low</option>
                <option value="likes_high_to_low">Most Liked</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        [...Array(8)].map((_, i) => (
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
            <SkeletonCard />
          </div>
        ))
      ) : (
        nfts.map((nft) => (
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={nft.id}>
            <NFTCard nft={nft} />
          </div>
        ))
      )}
    </>
  );
};

export default ExploreItems;
