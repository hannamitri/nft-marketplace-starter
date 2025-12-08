import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Card from "../UI/Card";

const ExploreItems = () => {
  const [sortRes, setSortRes] = useState("");
  const [collection, setCollection] = useState([]);
  const [resultsMax, setResultsMax] = useState(100);
  const [cardViewCount, setCardViewCount] = useState(8);

  function handleResultsCount() {
    setCardViewCount((prev) => prev + 4);
  }

  async function fetchCollection(sortValue) {
    if (sortRes !== "") {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortValue}`
        );
        setCollection(res.data);
        setResultsMax(res.data.length);
      } catch (err) {
        console.error(err);
      }
    } else
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setCollection(res.data);
        setResultsMax(res.data.length);
      } catch (err) {
        console.error(err);
      }
  }

  useEffect(() => {
    setCollection([]);
    setCardViewCount(8);
    fetchCollection(sortRes);
  }, [sortRes]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(e) => setSortRes(e.target.value)}
          defaultValue=""
          data-aos="fade-right"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
        <Card collection={collection} setViewLimit={cardViewCount} />
      {cardViewCount >= resultsMax ? (
        <></>
      ) : (
        <div data-aos="fade-up" className="col-md-12 text-center">
          <button
            id="loadmore"
            onClick={handleResultsCount}
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
