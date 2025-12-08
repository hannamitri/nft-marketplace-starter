import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import Skeleton from "./Skeleton";

const Card = ({ collection, setViewLimit = 6, authImage}) => {

  const visibleItems = collection.slice(0, setViewLimit)



  return (
    <>
      {collection.length !== 0
        ? visibleItems.map((item, index) => (
            <div
              key={index}
              className={setViewLimit === 6 ? "" : 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12'}
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-up"
              
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage || authImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {item.expiryDate ? <Countdown endTime={item.expiryDate} /> : <></>}

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
                  <div className="nft__item_price">{`${item.price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : Array.from({ length: setViewLimit }).map((_, index) => (
            <div
              key={index}
              className={`${setViewLimit === 6 ? '' :'d-item col-lg-3 col-md-6 col-sm-6 col-xs-12'}`}
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-up"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div>
                    <Skeleton width="50px" height="50px" borderRadius="100%" />
                    <i className="fa fa-check"></i>
                  </div>
                </div>

                <div className="nft__item_wrap">
                    <Skeleton width="100%" height="95%" />
                </div>
                <div className="nft__item_info">
                    <Skeleton width="50%" />
                  <div className="nft__item_price">
                    <Skeleton width="25%" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton height="14px" width="20px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Card;
