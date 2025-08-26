
import React from "react";
import { Link } from "react-router-dom";

import fallbackNft from "../images/nftImage.jpg";
import fallbackAuthor from "../images/author_thumbnail.jpg";


export default function NFTCard({ item }) {
  // I choose the item image or fall back to my local asset
  const nftImg = item?.nftImage || fallbackNft;
  const authorImg = item?.authorImage || fallbackAuthor; 
  
  return (
    // I keep the same markup/classes your template already uses
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          <img src={nftImg} className="lazy img-fluid" alt={item?.title || "NFT"} />
        </Link>
      </div>

      <div className="nft_coll_pp">
        <Link to="/author">
          <img className="lazy pp-coll" src={authorImg} alt="author" />
        </Link>
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{item?.title || "Untitled"}</h4>
        </Link>
        <span>{item?.code ? `ERC-${item.code}` : "ERC-###"}</span>
      </div>
    </div>
  );
}