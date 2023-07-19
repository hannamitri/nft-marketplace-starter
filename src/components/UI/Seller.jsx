import React from "react";
import { Link } from "react-router-dom";

function Seller({ seller }) {
  return (
    <>
      <li>
        <div className="author_list_pp">
          <Link to={`/author/${seller.id}`}>
            <img className="lazy pp-author" src={seller.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={`/author/${seller.id}`}>{seller.authorName}</Link>
          <span>{seller.price} ETH</span>
        </div>
      </li>
    </>
  );
}

export default Seller;
