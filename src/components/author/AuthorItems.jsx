import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../explore/ExploreItems.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const AuthorItems = () => {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState([]);
  const { authorId } = useParams();

  useEffect(() => {
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    .then((response) => {
      setTimeout(() => {
      setAuthor([response.data]);
      setLoading(false);
      }, 1000)
    })
    .catch((error) => {
      console.error("No item found:", error);
    });
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        {loading ?
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="skeleton__explore--items"></div>
              </div>
            ))}
          </div>
          :
        author.map((authorInfo) => (
        <div className="row" data-aos="fade-in" key={authorInfo}>
          {authorInfo.nftCollection.map((collection, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorInfo.authorImage} alt="" />
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
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img
                      src={collection.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <div className="nft__item_price">{collection.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{collection.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
       ))}
      </div>
    </div>
  );
};

export default AuthorItems;
