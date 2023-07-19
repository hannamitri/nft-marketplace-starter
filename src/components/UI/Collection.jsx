import React from "react";
import { Link } from "react-router-dom";

function Collection({ collection }) {
  return (
    <div className="width: 316.5px; margin-right: 10px;">
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to={`/item-details/${collection.nftId}`}>
            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={`/author/${collection.authorId}`}>
            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{collection.title}</h4>
          </Link>
          <span>ERC-{collection.code}</span>
        </div>
      </div>
    </div>
  );
}

export default Collection;
