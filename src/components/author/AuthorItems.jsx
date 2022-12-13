import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ nfts }) => {
  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div
    key={index}
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 nft__item"
    style={{ display: "block", backgroundSize: "cover"}}
  >
    <div className="author_list_pp">
      <div
        className="lazy skeleton-box"
        style={{
          width: 50,
          height: 50,
          borderRadius: 999,
          borderWidth: 5,
          borderStyle: "solid",
          borderColor: "white",
        }}
      ></div>
      <i className="fa fa-check"></i>
    </div>

    <div className="nft__item_wrap">
      <div
        className=" lazy nft__item_preview skeleton-box"
        style={{ width: 280, height: 300, borderRadius: 10 }}
      ></div>
    </div>
    <div className="nft__item_info">
      <div className="skeleton-box" style={{ width: "100px" }}></div>
    </div>
    <div
      className="nft__item_price skeleton-box"
      style={{ width: "50px" }}
    ></div>
  </div>
  ));

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!nfts || !nfts.nftCollection
            ? skeletonLoading
            : nfts.nftCollection.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img
                          className="lazy"
                          src={nfts.authorImage}
                          alt=""
                        />
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
