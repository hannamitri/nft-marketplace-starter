import React from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/home css/author.css";

const AuthorItems = () => {
  const { authorId } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setAuthorItems(response.data);
    console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    console.log(authorItems);
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          <div className="explore__wrapper">
            {loading
              ? new Array(8).fill(0).map((_, index) => (
                  <div className="author--loading" key={index}>
                    <div className="new__items-loading-author-wrapper">
                      <div className="new__items-loading-author"></div>
                    </div>
                    <div className="new__items-loading-author-text-wrapper">
                      <div className="new__items-loading-author-text"></div>
                      <div className="new__items-loading-author-mini-text-wrapper">
                        <div className="new__items-loading-author-mini-text"></div>
                        <div className="new__items-loading-likes"></div>
                      </div>
                    </div>
                  </div>
                ))
              : authorItems?.nftCollection?.map((response, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="author_list_pp">
                      <Link to={`/author/${response.authorId}`}>
                        <img
                          className="lazy"
                          src={authorItems.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item">
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
                        <Link to={`/item-details/${response.nftId}`}>
                          <img
                            src={response.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${response.nftId}`}>
                          <h4>{response.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {response.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{response.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )) 
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;