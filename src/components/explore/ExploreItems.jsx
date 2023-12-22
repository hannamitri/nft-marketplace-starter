/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import SkeletonImage from "../UI/SkeletonImage";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const loadMore = 4;
  const [load, setLoad] = useState(8);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => {
        setItems(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  function moreImages() {
    setLoad(loadMore + load);
  }
  async function filter(value) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setItems(data);
    setLoading(false);
  }
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => <SkeletonImage key={index} />)
        : items?.slice(0, load)?.map((item, index) => (
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
                {item.expiryDate && (
                  <Countdown expiryDate={item.expiryDate} />
                )}

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
                  <Link to={`/item-details/${item?.nftId}`}>
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
      <div className="col-md-12 text-center">
        {loadMore < items?.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={moreImages}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
