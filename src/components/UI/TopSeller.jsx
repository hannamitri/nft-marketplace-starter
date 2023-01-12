import React from "react";
import { Link } from "react-router-dom";

export default function TopSeller({ authImage, authId, authName, price }) {
  return (
    <li>
      <div className="author_list_pp">
        <Link to={`/author/${authId}`}>
          <img className="lazy pp-author" src={authImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to="/author">{authName}</Link>
        <span>{`${price} Eth`}</span>
      </div>
    </li>
  );
}
