import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorId, authorImage, loading: parentLoading }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        // Add a small delay to make loading state visible
        await new Promise(resolve => setTimeout(resolve, 500));
        setItems(response.data.nftCollection || []);
      } catch (error) {
        console.error("Error fetching author items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorItems();
    }
  }, [authorId]);

  if (loading || parentLoading) {
    return (
      <div className="row">
        {new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft__item skeleton-card skeleton-shimmer">
              <div className="skeleton-img" style={{ height: "250px" }}></div>
              <div className="skeleton-body">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line sub"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {items.map((item, index) => (
        <div 
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12" 
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={index % 4 * 100}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${authorId}`}>
                <img className="lazy" src={authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorItems;