import React from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "./Skeleton";

const AuthorDetails = ({ id, name, image, loading }) => {
  return (
    <div className="item_author">
      <div className="author_list_pp">
        <Link to={`/author/${id}`}>
          <img className="lazy" src={image} alt={name} />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${id}`}>{name}</Link>
      </div>
    </div>
  );
};

export default AuthorDetails;
