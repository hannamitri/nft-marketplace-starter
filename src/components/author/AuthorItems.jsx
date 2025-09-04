import React from "react";
import { Link } from "react-router-dom";

export default function AuthorItems({ items = [], authorImage = "" }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items for this author.</div>;
  }

  return (
    <div className="row">
      {items.map((item, idx) => (
        <div
          key={item.nftId ?? item.id ?? idx}
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author?authorId=${item.authorId ?? ""}`}
                title="Creator"
              >
                <img className="lazy" src={authorImage} alt="author" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="#" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="#" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              <Link to={`/item-details?nftId=${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title || ""}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details?nftId=${item.nftId}`}>
                <h4>{item.title || "Untitled"}</h4>
              </Link>
              <div className="nft__item_price">
                {typeof item.price === "number" ? `${item.price} ETH` : "—"}
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
