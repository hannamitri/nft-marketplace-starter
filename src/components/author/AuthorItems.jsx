import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "../UI/Skeleton";


const AuthorItems = ({ authorId }) => {

  const [ authors, setAuthors ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [ authorProfile, setAuthorProfile ] = useState({});

  useEffect(function () {
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setTimeout(function () {
      setAuthorProfile(data);
      setAuthors(data.nftCollection);
      setLoading(false);
    },2000);
  });
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
                       {loading ? (
              <>
  {new Array(8).fill(0).map((_, index) => (
    <div
  key={index}
  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
  style={{ display: "block", backgroundSize: "cover" }}
>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton
            width="48px"
            height="48px"
            borderRadius="50%"
          />
        </div>
        <div className="nft__item_wrap">
          <Skeleton
            width="100%"
            height="250px"
            borderRadius="8px"
          />
        </div>
        <div className="nft__item_info">
          <Skeleton
            width="75%"
            height="20px"
            borderRadius="4px"
          />
          <Skeleton
            width="40%"
            height="16px"
            borderRadius="4px"
          />
        </div>
      </div>
    </div>
  ))}
</>
             ) : (
          authors.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorProfile.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="/">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nft.id}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.id}`}>
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
             )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
