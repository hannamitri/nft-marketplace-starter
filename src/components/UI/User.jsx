import React from "react";
import { Link } from "react-router-dom";

export default function User({creator}) {
   
  return (
      <div
      key={creator.id}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12 slide" 
      >
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={creator.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={creator.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{creator.title}</h4>
            </Link>
            <span>ERC-{creator.code}</span>
          </div>
        </div>
      </div>
  );
}
