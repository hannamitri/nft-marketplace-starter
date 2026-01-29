import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import UserImagePlaceholder from "../UI/UserImagePlaceholder";

const AuthorItems = ( { collection, image, authorID, windowWidth } ) => {
  
  function renderCollection() {
    return collection?.map((nft) => (
      <div
        data-aos="fade-in" 
        data-aos-delay="100" 
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12" 
        key={nft.id}>
      <div className="nft__item">
        <div className="author_list_pp">
          {image ? (
            <Link to={`/author/${authorID}`}>
              <img className="lazy" src={image} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          ) : (
            <UserImagePlaceholder authorName={nft.authorName} />
          )}
        </div>
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
          <Link to={`/item-details/${nft.nftId}`}>
            <img
              src={nft.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${nft.nftId}`}>
            <h4>{nft.title}</h4>
          </Link>
          <div className="nft__item_price">{nft.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
    </div>
    ))
  }

  function renderSkeletonCollection() {
    let skeletonHeight;
    if ((windowWidth < 992 && windowWidth > 978) || 
        (windowWidth < 768)) {
      skeletonHeight = "550px"
    } else {
      skeletonHeight = "440px"
    }
    
    return new Array(8).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <Skeleton width="100%" height={skeletonHeight} borderRadius="20px" />
      </div>
    ))
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collection ? (
            renderCollection()
          ) : (
            renderSkeletonCollection()
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
