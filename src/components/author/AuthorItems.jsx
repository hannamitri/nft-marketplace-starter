import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const skeletonStyles = {
  item: {
    borderRadius: "12px",
    background: "#e2e5e7",
    padding: "24px 16px 20px 16px",
    minHeight: "320px",
    marginBottom: "24px",
  },
  avatar: {
    borderRadius: "50%",
    width: "64px",
    height: "64px",
    background: "#cfd2d4",
    margin: "0 auto 18px auto",
    display: "block",
  },
  image: {
    borderRadius: "12px",
    width: "100%",
    height: "170px",
    background: "#d8dadb",
    display: "block",
    marginBottom: "15px",
  },
  title: {
    background: "#cfd2d4",
    height: "18px",
    width: "70%",
    borderRadius: "6px",
    margin: "12px auto 10px auto",
  },
  price: {
    background: "#cfd2d4",
    height: "15px",
    width: "30%",
    borderRadius: "6px",
    margin: "0 auto 10px auto",
  },
  likes: {
    background: "#cfd2d4",
    height: "14px",
    width: "18%",
    borderRadius: "4px",
    margin: "0 auto",
  },
};

const Author = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  });
};

const AuthorItems = ({ nfts, loading, authorImage }) => (
  <div className="de_tab_content" data-aos="fade-up" data-aos-delay="600">
    <div className="tab-1">
      <div className="row">
        {loading
          ? [...Array(8)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div style={skeletonStyles.item}>
                  <div style={skeletonStyles.avatar}></div>
                  <div style={skeletonStyles.image}></div>
                  <div style={skeletonStyles.title}></div>
                  <div style={skeletonStyles.price}></div>
                  <div style={skeletonStyles.likes}></div>
                </div>
              </div>
            ))
          : nfts?.map((nft, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.nftId || index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="nft__img--author"
                        src={nft.authorImage || authorImage}
                        alt={nft.authorName || "NFT Author"}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                        }}
                      />
                      <i className="fa fa-check nft__icon--verified"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button className="nft__button--buy">Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="nft__item_preview"
                        alt={nft.title}
                        loading="lazy"
                        style={{
                          borderRadius: "12px",
                          width: "100%",
                          height: "170px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <h4 className="nft__title">{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
);

export default AuthorItems;
