import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)
    
  async function fetchUsers() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setUsers(data)
    setLoading(false)
  }

  useEffect (() => {
    fetchUsers()
  }, []);

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
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
        <div key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
                <div className="skeleton__avatar"></div>
                <i className="fa fa-check"></i>
            </div>

            <div className="nft__item_wrap">
              <div className="skeleton-box" />
            </div>
            <div className="nft__item_info">
              <h4 className="skeleton__title"></h4>
              <div className="nft__item_price skeleton__price" />
              <div className="nft__item_like">
                <div className="skeleton__like" />
              </div>
            </div>
          </div>
        </div>
      ))) : (
        users.slice(0, visibleCount).map((user) =>
           <div key={user.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}>
          <NftCard item={user} />
        </div>
        )
        )
      }
      
      <div className="col-md-12 text-center">
        {visibleCount < users.length && (
          <button id="loadmore" className="btn-main lead" onClick={() => setVisibleCount(visibleCount + 4)}>
          Load more
        </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
