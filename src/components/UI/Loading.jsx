import React from "react";

function Loading() {
  return (
    <>
      <div className="skeleton explore--skeleton">
        <div className="item__wrap--skeleton">
          <div className="pfp__skeleton">
            <i className="fa fa-check"></i>
          </div>
          <div className="countdown__skeleton"></div>
          <div className="background__skeleton"></div>
          <div className="title__skeleton"></div>
          <div className="price-likes__skeleton"></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
