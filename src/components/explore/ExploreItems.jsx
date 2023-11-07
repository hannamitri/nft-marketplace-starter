import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NftCard from "../common/NftCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [nftArray, setNftArray] = useState([]);
  const [nftsToShow, setNftsToShow] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState(""); // State for selected filter

  const loadMoreNfts = () => {
    setNftsToShow(nftsToShow + 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  // Function to handle filter selection change
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
  };

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
      {nftArray.length > 0
        ? nftArray.slice(0, nftsToShow).map((nft) => (
            <div
              key={nft?.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard nft={nft} />
            </div>
          ))
        : Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton
                    width={"60px"}
                    height={"60px"}
                    borderRadius={"25px"}
                  />
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>

                <div className="nft__item_info">
                  <Skeleton width={"160px"} height={"20px"} marginTop={"4px"} />
                  <div className="nft__item_price">
                    <Skeleton width={"90px"} height={"20px"} />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width={"28px"} height={"20px"} />
                  </div>
                </div>
              </div>
            </div>
          ))}

      <div className="col-md-12 text-center">
        {nftsToShow < 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreNfts}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
