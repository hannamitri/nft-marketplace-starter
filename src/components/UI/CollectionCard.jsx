import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ img, author, title, code, url, authId }) => {
  return (
    <div>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to={`/item-details/${url}`}>
            <img src={img} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={`/author/${authId}`}>
            <img className="lazy pp-coll" src={author} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{title}</h4>
          </Link>
          <span>ERC-{code}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
