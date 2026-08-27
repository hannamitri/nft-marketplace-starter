import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to={`/item-details/${collection.nftId}`}>
          <img
            src={collection.nftImage}
            className="lazy img-fluid"
            alt={collection.title}
          />
        </Link>
      </div>

      <div className="nft_coll_pp">
        <Link to={`/author/${collection.authorId}`}>
          <img
            className="lazy pp-coll"
            src={collection.authorImage}
            alt={`${collection.title} author`}
          />
        </Link>
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <Link to={`/item-details/${collection.nftId}`}>
          <h4>{collection.title}</h4>
        </Link>
        <span>ERC-{collection.code}</span>
      </div>
    </div>
  );
};

export default CollectionCard;
