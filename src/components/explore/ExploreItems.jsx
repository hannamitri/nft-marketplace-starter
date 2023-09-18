import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NftWithTimer from "../UI/NftWithTimer";

const ExploreItems = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalExplorePage, setOriginalExplorePage] = useState([]);
  const [visibleNFTs, setVisibleNFTs] = useState([]);
  const [explorePage, setExplorePage] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setVisibleNFTs(response.data.slice(0, 8));
      setExplorePage(response.data);
      setOriginalExplorePage(response.data);
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }

    fetchData();
  }, [url]);

  function filterNft(event) {
    const value = event.target.value;
    if (isLoaded) {
      if (value === "") {
        console.log(originalExplorePage.slice(0, visibleNFTs.length));
        setVisibleNFTs(originalExplorePage.slice(0, visibleNFTs.length));
      }
      if (value === "price_low_to_high") {
        const lowToHigh = [...explorePage].sort((a, b) => a.price - b.price);
        setVisibleNFTs(lowToHigh.slice(0, visibleNFTs.length));
        setExplorePage(lowToHigh);
      }
      if (value === "price_high_to_low") {
        const highToLow = [...explorePage].sort((a, b) => b.price - a.price);
        setVisibleNFTs(highToLow.slice(0, visibleNFTs.length));
        setExplorePage(highToLow);
      }
      if (value === "likes_high_to_low") {
        const LikesHighToLow = [...explorePage].sort(
          (a, b) => b.likes - a.likes
        );
        setVisibleNFTs(LikesHighToLow.slice(0, visibleNFTs.length));
        setExplorePage(LikesHighToLow);
      }
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" onChange={filterNft} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoaded ? (
        <>
          {visibleNFTs.map((nft, index) => (
            <span key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <NftWithTimer nft={nft} />
            </span>
          ))}
        </>
      ) : (
        <>
          {skeletonArr.map((__, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="skeleton snwt__skeleton"></div>
            </div>
          ))}
        </>
      )}
      {visibleNFTs.length !== 16 ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            onClick={() => {
              if (visibleNFTs.length === 8) {
                setVisibleNFTs(explorePage.slice(0, 12));
              } else if (visibleNFTs.length === 12) {
                setVisibleNFTs(explorePage.slice(0, 16));
              } else {
                setVisibleNFTs(visibleNFTs);
              }
            }}
            className="btn-main lead">
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
