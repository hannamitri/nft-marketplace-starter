import React from "react";

const LoadMore = ({ onLoadMore, showLoadMore }) => {
  return (
    <>
      {showLoadMore && (
        <div className="col-md-12 text-center">
          <button onClick={onLoadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMore;
