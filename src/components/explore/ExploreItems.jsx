import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = ({
  items,
  loading,
  handleLoadMore,
  sort,
  handleSortChange,
  hasMoreItems,
}) => {
  const exploreItemSkeleton = (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <Skeleton width="110px" height="25px" borderRadius="20px" />

      <div className="nft__item_wrap">
        <Skeleton width="100%" height="300px" borderRadius="5px" />
      </div>

      <div className="nft__item_info">
        <Skeleton width="140px" height="20px" borderRadius="4px" />

        <div style={{ marginTop: "8px" }}>
          <Skeleton width="80px" height="16px" borderRadius="4px" />
        </div>

        <div style={{ marginTop: "8px" }}>
          <Skeleton width="45px" height="16px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sort}
          onChange={(event) => {
            handleSortChange(event.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
            >
              {exploreItemSkeleton}
            </div>
          ))}
        </>
      ) : (
        items.map((item) => (
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
        ))
      )}
      {!loading &&
        hasMoreItems && (
          <div className="col-md-12 text-center">
            <Link
              to=""
              id="loadmore"
              className="btn-main lead"
              onClick={handleLoadMore}
            >
              Load more
            </Link>
          </div>
        )}
    </>
  );
};

export default ExploreItems;
