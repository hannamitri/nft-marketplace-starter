import React from "react";

function AuthorItemsLoading() {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: "400px" }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorItemsLoading;
