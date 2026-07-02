import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthorItems() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setItems(data.nftCollection || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    }
    if (authorId) fetchAuthorItems();
  }, [authorId]);

  if (loading) return <div className="text-center">Loading items...</div>;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_action">
                    <span><i className="fa fa-heart"></i> {item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;