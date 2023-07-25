import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { NFTCard } from "../UI/NFTCard";
const ExploreItems = () => {
  const [loading, Setloading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [arrays, setArrays] = useState(8);
  const [sortingOption, setSortingOption] = useState("");

  const API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await axios.get(API);
        const fetchData = response.data;
        setFetchedData(fetchData);
        Setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Setloading(false);
      }
    }
    fetchCollections();
  }, []);

  const loadMore = () => {
    setArrays(arrays + 4);
  };

  const handleSortingChange = (event) => {
    const selectedOption = event.target.value;
    setSortingOption(selectedOption);

    let sortedData = [...fetchedData];
    if (selectedOption === "price_low_to_high") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "price_high_to_low") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "likes_high_to_low") {
      sortedData.sort((b, a) => a.likes - b.likes);
    }
    setFetchedData(sortedData);
  };

  return (
    <>
      <div>
        <select
          onChange={handleSortingChange}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && (
        <>
          {Array.from({ length: arrays }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} />
                </div>
                <div className="de_countdown-seklly">
                  <Skeleton width={100} height={30} />
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Skeleton width={250} height={225} />
                </div>
                <div className="nft__item_info">
                  <Skeleton height={20} width={100} />
                  <div className="nft__item_price">
                    <Skeleton height={15} width={60} />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton height={15} width={15} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {fetchedData.slice(0, arrays).map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NFTCard nft={nft} />
        </div>
      ))}
      {fetchedData.length > arrays && (
        <div className="col-md-12 text-center">
          <Link
            onClick={loadMore}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
