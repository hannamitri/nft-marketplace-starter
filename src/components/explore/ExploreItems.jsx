import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    async function fetchExploreItems() {
      try {
        setLoading(true);
        const [response] = await Promise.all([
          axios.get("/explore"),
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchExploreItems();
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const filterItems = (filter) => {
    let sortedItems = [...items];
    if (filter === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (filter === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (filter === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }
    setItems(sortedItems);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => filterItems(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Skeleton width="100%" height="350px" />
              </div>
              <div className="nft__item_info">
                <Skeleton width="100px" height="20px" />
                <div className="nft__item_price">
                  <Skeleton width="60px" height="20px" />
                </div>
                <div className="nft__item_like">
                  <Skeleton width="30px" height="15px" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        items.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
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
        ))
      )}
      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={(e) => {
            e.preventDefault();
            loadMore();
          }}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
