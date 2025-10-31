import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ items, author }) => {

  console.log(items)
  console.log(author)
 
 
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
            >
              <div className="nft__item">
                {/* Author Avatar */}
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={author.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* NFT Image */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href={`mailto:?subject=Check this NFT&body=${window.location.href}`}>
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                {/* NFT Info */}
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
