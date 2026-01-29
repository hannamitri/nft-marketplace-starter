import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import UserImagePlaceholder from "../UI/UserImagePlaceholder";
import CountdownDisplay from "../UI/CountdownDisplay";

const ExploreItems = ({ windowWidth, items, onFilterChange }) => {
  const [visibleItems, setVisibleItems] = useState(8);

  function handleLoadMore() {
    setVisibleItems(prevVisible => prevVisible + 4);
  }

  function renderItems() {
    return items.slice(0, visibleItems).map((item) => (
      <div
          data-aos="fade-in" 
          data-aos-delay="100"
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
                {item.authorImage ? (
                  <img className="lazy" src={item.authorImage} alt="" />
                ) : (
                  <UserImagePlaceholder authorName={item.authorName} />
                )} 
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown"><CountdownDisplay expiryDate={item.expiryDate} /></div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="https://www.x.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="mailto:recipient@example.com">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`} >
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`} >
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
  ))};

  function renderSkeletonItems() {
    let skeletonHeight;
    if ((windowWidth < 992 && windowWidth > 978) || 
        (windowWidth < 768)) {
      skeletonHeight = "550px"
    } else {
      skeletonHeight = "440px"
    }
    return new Array(8).fill(0).map((_, index) => (
      <div
        key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <Skeleton width="100%" height={skeletonHeight} borderRadius="20px" />
      </div>
  ))}

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          defaultValue="" 
          onChange={(event) => {
            setVisibleItems(8);
            onFilterChange(event.target.value)}} >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length > 0 ? (
        renderItems()
      ) : (
        renderSkeletonItems()
      )}
      <div className="col-md-12 text-center">
        {visibleItems < items.length && (
          <button 
            id="loadmore" 
            className="btn-main lead"
            onClick={handleLoadMore} >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
