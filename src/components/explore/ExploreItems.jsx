import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../home/CountdownTimer.jsx";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NewItem from "../home/NewItem.jsx";

const ExploreItems = () => {
  const [slice, setSlice] = useState(8);
  let data = [0];
  const [option, setOption] = useState("");
  const showMore = () => {
    console.log(slice);
    setSlice((prev) => prev + 4);
    console.log(slice);
  };
  const [loading, setLoading] = useState([]);
  const [collections, setCollections] = useState();

  useEffect(() => {
    async function getData() {
      // console.log("OPTION" + option);
      if (option == "price_low_to_high") {
        data = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
        );
      } else if (option == "price_high_to_low") {
        data = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
        );
      } else if (option == "likes_high_to_low") {
        data = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
        );
      } else {
        data = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
      }
      console.log(data.data);
      setCollections(data.data);
      setLoading(false);
    }
    getData();
  }, [loading]);
  const customStyles = {
    width: "100%",
    height: "400px",
  };

  const sort = (event) => {
    setOption(event.target.value);
    setLoading(true);
  };
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={sort}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(12).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="skeleton-box" style={customStyles}></div>
            </div>
          ))
        : collections.slice(0, slice).map((collection) => (
            <div
              key={collection.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItem item={collection} />
            </div>
          ))}
      <div className="col-md-12 text-center">
        {slice != 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={showMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};
export default ExploreItems;
