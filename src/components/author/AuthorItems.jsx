import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "../../css/general.css";

const AuthorItems = ({ loading, authorProfile, nftCollection }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div className="author__img--loading skeleton"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item--loading skeleton"></div>
                    </div>

                    <div className="nft__item_info">
                      <h4 className="item__title--loading skeleton"></h4>
                      <div className="nft__item_price--loading skeleton"></div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span className="item__likes--loading skeleton"></span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))
            : nftCollection?.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorProfile} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
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
                      <div className="nft__item_price">{item.price}</div>
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
