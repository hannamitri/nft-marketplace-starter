import React from "react";
import Skeleton from "react-loading-skeleton";

const NewItemsSkeleton = () => {
  return (
    <div className="px-2">
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton circle width={50} height={50} />
          <i className="fa fa-check"></i>
        </div>
        <div
          className="nft__item_wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href="">
            <Skeleton
              width={"100%"}
              height={175}
              style={{
                display: "block",
                margin: 0,
                padding: 0,
              }}
            />
          </a>
        </div>
        <div className="nft__item_info">
          <h4
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            <Skeleton
              style={{
                margin: 0,
                padding: 0,
              }}
            />
          </h4>
          <div
            className="nft__item_price"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-10px",
              padding: 0,
            }}
          >
            <Skeleton
              width={50}
              style={{
                margin: 0,
                padding: 0,
              }}
            />
          </div>
          <div
            className="nft__item_like"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{
                marginLeft: '-20px'
            }}>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItemsSkeleton;


