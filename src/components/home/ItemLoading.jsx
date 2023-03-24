import React from "react";

function ItemLoading({index, classes}) {
  return (
      <div key={index} className={classes}
      style={{ display: "block", backgroundSize: "cover" }}>
        <div className="nft__item">
          <div className="author_list_pp">
            <div
              className="skeleton-box"
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50px",
              }}
            ></div>
            <i className="fa fa-check"></i>
          </div>

          <div className="nft__item_wrap ">
            <div className="nft__item_extra"></div>
            <div
              className="skeleton-box"
              alt=""
              style={{
                width: "100%",
                height: "350px",
                marginBottom: "12px",
              }}
            ></div>
          </div>
          <div className="nft__item_info">
            <div
              className="skeleton-box"
              style={{ width: "180px", height: "30px" }}
            ></div>
            <div
              className="skeleton-box"
              style={{
                width: "100px",
                height: "20px",
                display: "block",
              }}
            ></div>
            <div className="nft__item_like">
              <div
                className="skeleton-box"
                style={{ width: "30px", height: "15px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ItemLoading;
