import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorDetails from "./AuthorDetails"; // To show author info

const AuthorItems = () => {
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredItem, setFeaturedItem] = useState(null);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012")
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch featured item on mount
  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494")
      .then((res) => res.json())
      .then((data) => setFeaturedItem(data))
      .catch(() => setFeaturedItem(null));
  }, []);

  return (
    <>
      {/* Show featured item if loaded */}
      {featuredItem && (
        <div className="featured-item" style={{ marginBottom: 32, padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h3>Featured Item</h3>
          <img src={featuredItem.nftImage} alt={featuredItem.title} style={{ width: 200, borderRadius: 8 }} />
          <div><strong>{featuredItem.title}</strong></div>
          <div>Price: {featuredItem.price} ETH</div>
          <div>Likes: {featuredItem.likes}</div>
        </div>
      )}

      {/* Show author details */}
      {author && <AuthorDetails author={author} />}
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                      </div>
                      <div className="nft__item_wrap">
                        <div className="skeleton skeleton-img" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
                      </div>
                      <div className="nft__item_info">
                        <div className="skeleton skeleton-title" style={{ width: "80%", height: "20px" }}></div>
                        <div className="skeleton skeleton-code" style={{ width: "40%", height: "16px" }}></div>
                      </div>
                    </div>
                  </div>
                ))
              : items.map((item, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
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
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
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
        </div>
      </div>
    </>
  );
};

export default AuthorItems;