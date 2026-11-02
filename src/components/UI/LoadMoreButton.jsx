import React from "react";
import { Link } from "react-router-dom";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="col-md-12 text-center">
      <Link
        to=""
        id="loadmore"
        className="btn-main lead"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        Load more
      </Link>
    </div>
  );
};

export default LoadMoreButton;
