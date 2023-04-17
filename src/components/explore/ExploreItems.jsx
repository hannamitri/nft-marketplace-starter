import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountDownTimer from "../UI/CountDownTimer";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = () => {
  const [loadExploreItems, setLoadExploreItems] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState();
  const [numItems, setNumItems] = useState(8);
  const [filterApi, setFilterApi] = useState("");

  async function fetchExploreItems() {
    setLoadingSkeleton(true);
    const api = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterApi}`;

    const { data } = await axios.get(api);
    setLoadingSkeleton(false);
    setLoadExploreItems(data);
  }

  useEffect(() => {
    fetchExploreItems();
  }, [filterApi]);

  const loadNextItems = () => {
    setNumItems(numItems + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(event) => setFilterApi(event.target.value)}
          value={filterApi}
        >
          <option value="likes_high_to_low">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loadExploreItems.slice(0, numItems).map((items) => (
        <div
          key={items.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              {loadingSkeleton ? (
                <Skeleton
                  width={"100%"}
                  height={"50px"}
                  borderRadius={"240px"}
                />
              ) : (
                <Link
                  to={`/author/${items.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={items.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              )}
            </div>
            {loadingSkeleton ? (
              <Skeleton />
            ) : (
              <div>
                {items.expiryDate <= 0 ? (
                  <p className="d-none"></p>
                ) : (
                  <CountDownTimer items={[items]} />
                )}
              </div>
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
              {loadingSkeleton ? (
                <Skeleton width={"100%"} height={"120px"} />
              ) : (
                <Link to={`/item-details/${items.nftId}`}>
                  <img
                    src={items.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              )}
            </div>

            <div className="nft__item_info">
              {loadingSkeleton ? (
                <Skeleton width={"50%"} height={"15px"} borderRadius={"24px"} />
              ) : (
                <>
                  <Link to="/item-details">
                    <h4>{items.title}</h4>
                  </Link>
                  <div className="nft__item_price">{items.price}</div>
                </>
              )}
              <div className="nft__item_like">
                {loadingSkeleton ? (
                  <>
                    <Skeleton
                      width={"100%"}
                      height={"15px"}
                      borderRadius={"24px"}
                    />
                    <i style={{ width: "10px" }}> </i>
                    <span></span>
                  </>
                ) : (
                  <>
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div onClick={loadNextItems} className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
