import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import newItemData from "../../api/newItemApi.json";
import authorData from "../../api/authorApi.json";
import Carousel from "../shared/Carousel";

const NewItemSkeleton = () => (
  <div className="skeleton-new-item">
    <Skeleton
      type="avatar"
      className="skeleton-author-circle"
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1,
        border: "2px solid white",
      }}
    />
    <Skeleton
      type="timer"
      className="skeleton-timer"
      style={{ position: "absolute", top: "10px", right: "10px" }}
    />
    <Skeleton
      type="image"
      className="skeleton-item-image"
      style={{ marginTop: "40px", borderRadius: "8px" }}
    />
    <Skeleton
      type="title"
      className="skeleton-item-title"
      style={{ marginTop: "20px" }}
    />
    <Skeleton
      type="price"
      className="skeleton-item-price"
      style={{ marginTop: "10px" }}
    />
    <Skeleton
      type="subtitle"
      className="skeleton-item-likes"
      style={{ marginTop: "10px" }}
    />
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [startTime, setStartTime] = useState(new Date().getTime());

  useEffect(() => {
    const initialTime = new Date().getTime();
    setStartTime(initialTime);
    
    const mappedItems = newItemData.map(item => {
      const authorMatch = authorData.find(author => {
        return author.authorId === item.authorId;
      });
      
      return {
        ...item,
        mappedAuthorId: authorMatch ? authorMatch.id : null
      };
    });
    
    setItems(mappedItems);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatRemainingTime = (expiryDateStr) => {
    if (!expiryDateStr) {
      return null;
    }
    
    const expiryTimestamp = parseInt(expiryDateStr);
    
    if (isNaN(expiryTimestamp)) {
      return null;
    }
    
    const elapsedSinceStart = currentTime - startTime;
    const timeRemaining = expiryTimestamp - elapsedSinceStart;

    if (timeRemaining <= 0) {
      return null;
    }

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Carousel skeletonItem={NewItemSkeleton}>
            {items.map((item) => (
              <div className="nft__item" key={item.id}>
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.mappedAuthorId || item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorId}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {formatRemainingTime(item.expiryDate) && (
                  <div className="de_countdown">
                    {formatRemainingTime(item.expiryDate)}
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=Check out this NFT" target="_blank" rel="noreferrer">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
