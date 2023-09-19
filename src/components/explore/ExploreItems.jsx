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
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=";
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setVisibleNFTs(response.data.slice(0, 8));
          setExplorePage(response.data);
          setOriginalExplorePage(response.data);
          setTimeout(() => {
            setIsLoaded(true);
          }, 200);
        }
      } catch (error) {}
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  async function filterNft(e) {
    const value = e.target.value;
    if (value === "") {
      setVisibleNFTs(originalExplorePage.slice(0, visibleNFTs.length));
    }
    const filteredData = (await axios.get(url + value)).data;
    setVisibleNFTs(filteredData.slice(0, visibleNFTs.length));
    setExplorePage(filteredData);
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
