import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ isLoading, author }) => {
  const [currAuth, setCurrAuth] = useState(new Array(8).fill(0));

  useEffect(() => {
    setCurrAuth(author);
    console.log(currAuth.nftCollection);
  }, [currAuth, []]);

  function isCollection() {
    if (currAuth.nftCollection) {
      return currAuth.nftCollection
    } else {
      return [0, 0, 0, 0]
    }
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isCollection().map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              {isLoading ? (
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: "400px" }}
                ></div>
              ) : (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img className="lazy" alt="" src={author.authorImage} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
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
                        src={_.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{_.title}</h4>
                    </Link>
                    <div className="nft__item_price">{_.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{_.likes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
