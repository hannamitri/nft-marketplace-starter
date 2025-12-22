import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ authorId, authorData }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;

    const expiry = new Date(expiryDate).getTime();
    const timeDifference = expiry - currentTime;

    if (timeDifference <= 0) {
      return "Expired";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  if (!authorData) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="de_countdown">
                    <Skeleton width="80px" height="20px" borderRadius="4px" />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="80%" height="24px" borderRadius="4px" />
                    <div style={{ marginTop: "8px" }}>
                      <Skeleton width="60%" height="20px" borderRadius="4px" />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      <Skeleton width="40px" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!authorData.nftCollection || authorData.nftCollection.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center" style={{ padding: "50px 0" }}>
                <h3>No NFTs Found</h3>
                <p>This author hasn't created any NFTs yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorData.nftCollection.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${authorData.authorName || 'Unknown'}`}
                  >
                    <img
                      className="lazy"
                      src={authorData.authorImage || AuthorImage}
                      alt={`${authorData.authorName}'s profile`}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {formatCountdown(item.expiryDate) && (
                  <div className="de_countdown">
                    {formatCountdown(item.expiryDate)}
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

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title || 'NFT'}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title || 'Untitled'}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price || '0'} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;