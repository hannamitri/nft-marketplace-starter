import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const fetchExplore = async (filter = "") => {
    try {
      const res = await axios.get(
        `${API_URL}${filter ? `?filter=${filter}` : ""}`,
      );
      setExplore(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExplore();
  }, []);

  const filterItems = (event) => {
    const filter = event.target.value;
    fetchExplore(filter);
  };

  return (
    <>
      <div>
        <select onChange={filterItems} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton height="50px" width="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div>
                    <Skeleton width="100%" height="350px" />
                  </div>
                  <div className="nft__item_info">
                    <h4>
                      <Skeleton width="140px" height="25px" />
                    </h4>
                    <div className="nft__item_price">
                      <Skeleton width="50px" height="15px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="15px" height="10px" />
                    </div>
                  </div>
                </div>
              </div>
            ))
        : explore.slice(0, visible).map((item) => (
            <div
              key={item.id}
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
                <Countdown expiryDate={item.expiryDate} />
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
          ))}

      <div className="col-md-12 text-center">
        <button onClick={loadMore} className="btn-main lead">
          Load More
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
