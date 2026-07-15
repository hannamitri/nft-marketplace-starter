import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Card from "../UI/Card";


const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExploreItems();
  }, []);

  async function fetchExploreItems() {
   try { const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
   setExploreItems(data);
   setLoading(false);
    console.log(data)
  } catch {
    setLoading(false);
    console.error("There was an error fetching Explore Items");
  }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
          {exploreItems.map((item) => (
        <div
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <Card key={item.nftId
          } {...item}/>
          </div>
          ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
