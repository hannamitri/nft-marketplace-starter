import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";
import useMinimumLoading from "../UI/useMinimumLoading";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const displayLoading = useMinimumLoading(loading, 700);

  useEffect(() => {
    setLoading(true);
    async function fetchItems() {
      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setLoading(false);
      setVisibleCount(8);
    }
    fetchItems();
  }, [filter]);

  return (
    <>
      <div data-aos="fade-up">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {displayLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 60}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="nft__item_wrap" style={{ marginTop: "8px" }}>
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="80%" height="20px" borderRadius="4px" />
                  <Skeleton width="40%" height="15px" borderRadius="4px" />
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleCount).map((item, index) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 60}
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
                {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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
      {!displayLoading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            id="loadmore"
            className="btn-main lead"
            data-aos="fade-up"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
